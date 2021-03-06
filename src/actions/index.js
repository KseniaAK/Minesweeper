import { MINE } from '../appConstants'

export const CHANGE_COLOR = 'CHANGE_COLOR'
export const REVERT_COLOR = 'REVERT_COLOR'
export const INITIALIZE = 'INITIALIZE'
export const REVEAL = 'REVEAL'
export const GAME_OVER = 'GAME_OVER'
export const FLAG = 'FLAG'
export const UN_FLAG = 'UN_FLAG'
export const START_GAME = 'START_GAME'
export const CHANGE_MINE_NUM = 'CHANGE_MINE_NUM'
export const CHANGE_WIDTH = 'CHANGE_WIDTH'

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

// update the selected number of mines in Redux store
export function changeMineNumber(mineNum) {
  return {
    type: CHANGE_MINE_NUM,
    mineNum
  }
}

// update the selected board width in Redux store
export function changeWidth(width) {
  return {
    type: CHANGE_WIDTH,
    width
  }
}

// since user is allowed to change board width, we need to get it dynamiccaly from store
export function initializeBoard(mineNum) {
  return (dispatch, getState) => {
    const width = getState().selectedWidth
    dispatch({
      type: INITIALIZE,
      minedSquaresArr: getMinedSquares(mineNum, width),
      width
    })
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

// generate a random number within board area limits
function generateLocation(minedSqArr, width) {
  // Random number will be the position of a mine
  // Minimum 1, maximum is width * width
  const mineLocation = Math.floor(Math.random() * (width * width) + 1)
  if (minedSqArr.indexOf(mineLocation) !== -1) return generateLocation(minedSqArr, width)
  return mineLocation
}

// get an array of random mined square locations on the board
// passing in the desired number of mines
function getMinedSquares(mineNum, width) {
  const minedSq = []
  for (let i = 0; i < mineNum; i++) {
    minedSq.push(generateLocation(minedSq, width))
  }
  return minedSq
}

export function clickBoardSquare(mouseButton, squareNum) {
  return (dispatch, getState) => {
    const hasMine = (squareNum) => (getState().boardConfig[squareNum - 1].val === MINE)
    const isZero = (squareNum) => (getState().boardConfig[squareNum - 1].val === 0)
    const isFlagged = (squareNum) => (getState().boardConfig[squareNum - 1].flag)
    const isOpen = (squareNum) => (getState().boardConfig[squareNum - 1].open)

    // clicking an open square does nothing
    if (isOpen(squareNum)) return

    // left mouse button
    if (mouseButton === 0) {
      // if square is flagged, do not reveal it
      if (isFlagged(squareNum)) return

      // if player opens a mine first click in the game, re-initialize the board
      if (getState().gameOn === false && hasMine(squareNum)) {
        dispatch(initializeBoard(getState().selectedMineNum))
        return dispatch(clickBoardSquare(mouseButton, squareNum))
      }
      
      if (getState().gameOn === false) dispatch(startGame())

      // if player clicks with left mouse button, reveal the square
      dispatch(revealSquare(squareNum))

      // if player revealed a zero, propagate and reveal all touching squares
      if (isZero(squareNum)) {
        const adjacentSquares = getAdjacentSquares(squareNum, getState().selectedWidth)
        adjacentSquares.forEach((square) => {
          if (isFlagged(square) || isOpen(square)) return
          else dispatch(clickBoardSquare(0, square))
        })
      }

      // In case player revealed square is a mine
      if (hasMine(squareNum)) {
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

// when player double-clicks a square, reveal all adjacent non-mine, un-flagged squares
export function doubleClickBoardSquare(squareNum) {  
  return (dispatch, getState) => {
    const hasMine = (squareNum) => (getState().boardConfig[squareNum - 1].val === 'X')
    const isZero = (squareNum) => (getState().boardConfig[squareNum - 1].val === 0)
    const isFlagged = (squareNum) => (getState().boardConfig[squareNum - 1].flag)
    const isOpen = (squareNum) => (getState().boardConfig[squareNum - 1].open)
    const getValue = (squareNum) => (getState().boardConfig[squareNum - 1].val)

    const hasEnoughAdjacentFlags = (requiredFlagsNum, squareNum) => {
      const adjacentSquares = getAdjacentSquares(squareNum, getState().selectedWidth)

      // count how many adjacent squares are flagged
      const actualAdjacentFlagsNum = adjacentSquares.reduce((total, square) => {
        if (isFlagged(square)) return total + 1
        else return total
      }, 0)

      // if number of flagged adjacent squares is equal to the dbl-clicked square's numeric value
      // then enough have been flagged
      if (actualAdjacentFlagsNum === requiredFlagsNum) return true
      else return false
    }
    
    if (isOpen(squareNum)
      && !isZero(squareNum)
      && hasEnoughAdjacentFlags(getValue(squareNum), squareNum)
    ) {
      const adjacentSquares = getAdjacentSquares(squareNum, getState().selectedWidth)
      adjacentSquares.forEach((square) => {
        if (!isFlagged(square)) {
          dispatch(clickBoardSquare(0, square))
        }
      })
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

function getAdjacentSquares(currSquare, width) {
  // based on the following scheme of squares
  // _0_|_1_|_2_
  // _3_|cur|_4_
  // _5_|_6_|_7_

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
  // ___|___|___
  // _3_|cur|_4_
  // _5_|_6_|_7_
  if (currSquare - width <= 0) {
    adjacentSquares[0] = null
    adjacentSquares[1] = null
    adjacentSquares[2] = null
  }
  
  // Current square is last one in the row - no squares on its right
  // _0_|_1_|___
  // _3_|cur|___
  // _5_|_6_|___
  if (currSquare % width === 0) {
    adjacentSquares[2] = null
    adjacentSquares[4] = null
    adjacentSquares[7] = null
  }
  
  // Current square is first one in the row - no square on its left
  // ___|_1_|_2_
  // ___|cur|_4_
  // ___|_6_|_7_
  if (currSquare === 1 || currSquare % width === 1) {
    adjacentSquares[0] = null
    adjacentSquares[3] = null
    adjacentSquares[5] = null    
  }
  
  // Current square is in the last row - no squares below it
  // _0_|_1_|_2_
  // _3_|cur|_4_
  // ___|___|___
  if (currSquare + width > width * width) {
    adjacentSquares[5] = null
    adjacentSquares[6] = null
    adjacentSquares[7] = null
  }

  // filter out non-existent (null) square values
  return adjacentSquares.filter((square) => square)
}