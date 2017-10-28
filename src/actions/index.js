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
    if (mouseButton === 0) {
      // if player opens a mine first click in the game, re-initialize the board
      if (getState().gameOn === false && getState().boardConfig[squareNum - 1].val === 'X') {
        dispatch(initializeBoard())
        dispatch(clickBoardSquare(mouseButton, squareNum))
      }
      
      if (getState().gameOn === false) dispatch(startGame())

      // if player clicks with left mouse button, reveal the square
      dispatch(revealSquare(squareNum))

      // In case player revealed square is a mine
      if (getState().boardConfig[squareNum - 1].val === 'X') {
        // change board color to red
        dispatch(changeColor('gameOver'))
        // toggle gameon to false to reveal all squares
        dispatch(gameOver())
      }
    } else if (mouseButton === 2) {
      // if player clicks with right mouse button, flag the square
      getState().boardConfig[squareNum - 1].flag ? dispatch(unFlagSquare(squareNum)) : dispatch(flagSquare(squareNum))
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
