export const CHANGE_COLOR = 'CHANGE_COLOR'
export const REVERT_COLOR = 'REVERT_COLOR'
export const INITIALIZE = 'INITIALIZE'
export const REVEAL = 'REVEAL'
export const GAME_OVER = 'GAME_OVER'
export const WIDTH = 9
export const FLAG = 'FLAG'
export const UN_FLAG = 'UN_FLAG'
export const START_GAME = 'START_GAME'
const MAX_MINES = 18

export function changeColor(colorNum) {
  return {
    type: CHANGE_COLOR,
    colorNum
  }
}

export function revertColor() {
  return {
    type: REVERT_COLOR
  }
}

export function initializeBoard() {
  return {
    type: INITIALIZE,
    minedSquaresArr: getMinedSquares()
  }
}

export function revealSquare(squareNum) {
  return {
    type: REVEAL,
    squareNum
  }
}

export function gameOver() {
  return {
    type: GAME_OVER
  }
}

function generateLocation(minedSqArr) {
  // Random number will be the position of a mine
  // Minimum 1, maximum WIDTH * WIDTH
  const mineLocation = Math.floor(Math.random() * (WIDTH * WIDTH) + 1)
  if (minedSqArr.indexOf(mineLocation) !== -1) return generateLocation(minedSqArr)
  return mineLocation
}

function getMinedSquares() {
  const minedSq = []
  for (let i = 0; i < MAX_MINES; i++) {
    minedSq.push(generateLocation(minedSq))
  }
  return minedSq
}

export function clickBoardSquare(mouseButton, squareNum) {
  return (dispatch, getState) => {
    const hasMine = (getState().boardConfig[squareNum - 1].val === 'X')
    const isZero = (squareNum) => (getState().boardConfig[squareNum - 1].val === 0)
    const isFlagged = (squareNum) => (getState().boardConfig[squareNum - 1].flag)
    const isOpen = (squareNum) => (getState().boardConfig[squareNum - 1].open)

    // left mouse button
    if (mouseButton === 0) {
      // if square is flagged, do not reveal it
      if (isFlagged(squareNum)) return

      // if player opens a mine first click in the game, re-initialize the board
      if (getState().gameOn === false && hasMine) {
        dispatch(initializeBoard())
        return dispatch(clickBoardSquare(mouseButton, squareNum))
      }
      
      if (getState().gameOn === false) dispatch(startGame())

      // if player clicks with left mouse button, reveal the square
      dispatch(revealSquare(squareNum))

      // if player revealed a zero, propagate and reveal all touching zero squares
      if (isZero(squareNum)) {
        const adjacentZeros = getAdjacentZeros(squareNum, WIDTH, getState().boardConfig)
        adjacentZeros.forEach((square) => {
          if (isFlagged(square) || isOpen(square)) return
          else dispatch(clickBoardSquare(0, square))
        })
      }

      // In case player revealed square is a mine
      if (hasMine) {
        // change board color to indicate loss
        dispatch(changeColor('gameOver'))
        // toggle gameOn to false to reveal all squares
        dispatch(gameOver())
      }
    }
    
    // right mouse button
    if (mouseButton === 2) {
      // flag the square if player clicks with right mouse button for the first time on a given square
      // UNflag if this is second right-button click on the given square
      isFlagged(squareNum) ? dispatch(unFlagSquare(squareNum)) : dispatch(flagSquare(squareNum))
    }
  }
}

function flagSquare(squareNum) {
  return {
    type: FLAG,
    squareNum
  }
}

function unFlagSquare(squareNum) {
  return {
    type: UN_FLAG,
    squareNum
  }
}

function startGame() {
  return {
    type: START_GAME
  }
}

function getAdjacentZeros(currSquare, width, allSquaresArray) {
  const adjacentSquares = [
    currSquare - width - 1,
    currSquare - width,
    currSquare - width + 1,
    currSquare - 1,
    currSquare + 1,
    currSquare + width - 1,
    currSquare + width,
    currSquare + width + 1
  ]

  // Current square is in the first row - no squares above it
  if (currSquare - width <= 0) {
    adjacentSquares[0] = null
    adjacentSquares[1] = null
    adjacentSquares[2] = null
  }
  
  // Current square is last one in the row - no squares on its right
  if (currSquare % width === 0) {
    adjacentSquares[2] = null
    adjacentSquares[4] = null
    adjacentSquares[7] = null
  }
  
  // Current square is first one in the row - no square on its left
  if (currSquare === 1 || currSquare % width === 1) {
    adjacentSquares[0] = null
    adjacentSquares[3] = null
    adjacentSquares[5] = null    
  }
  
  // Current square is in the last row - no squares below it
  if (currSquare + width > width * width) {
    adjacentSquares[5] = null
    adjacentSquares[6] = null
    adjacentSquares[7] = null
  }

  return adjacentSquares.filter((square) => {
    // Check whether adjacent square exists and has zero mines touching it
    return (square && (allSquaresArray[square - 1].val === 0))
  })
}
