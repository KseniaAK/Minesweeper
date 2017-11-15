import {
  INITIALIZE, 
  REVEAL, 
  GAME_OVER, 
  FLAG,
  UN_FLAG
} from '../actions/index'

import { WIDTH_OPTIONS } from '../appConstants'

function getDefaultState() {
  const defaultState = []
  for (let i = 0; i < WIDTH_OPTIONS[0] * WIDTH_OPTIONS[0]; i++) {
    defaultState.push({
      num: null,
      val: null,
      open: false,
      flag: false,
      valueToRender: ''
    })
  }
  return defaultState
}

export default function(state = getDefaultState(), action) {
  const newBoardState = [...state]
  switch(action.type) {

    //set the board up for a new game
    case INITIALIZE:
      return initializeBoard(action.minedSquaresArr, action.width)
      
    case REVEAL:
      newBoardState[action.squareNum - 1].open = true

      // if current square touches zero mines - render empty square, not the value which is zero
      const valueToRender = (state[action.squareNum - 1].val === 0) ? '' : state[action.squareNum - 1].val
      newBoardState[action.squareNum - 1].valueToRender = valueToRender     
      return newBoardState

    case GAME_OVER:
      // reveal all squares
      Object.keys(newBoardState).forEach((key) => {
        newBoardState[key].open = true
        const valueToRender = (state[key].val === 0) ? '' : state[key].val        
        newBoardState[key].valueToRender = valueToRender
      })
      return newBoardState

    case FLAG:
      newBoardState[action.squareNum - 1].flag = true
      newBoardState[action.squareNum - 1].valueToRender = '?'
      return newBoardState

    case UN_FLAG:
      newBoardState[action.squareNum - 1].flag = false
      newBoardState[action.squareNum - 1].valueToRender = ''
      return newBoardState

    default:
      return state
  }
}

function getAdjacentX(currSquare, minedSqArr, width) {
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

  // add up number of adjacent mines (X's)
  return adjacentSquares.reduce((numOfX, square) => {
    // Check whether adjacent square exists and has a mine
    if (square && (minedSqArr.indexOf(square) !== -1)) return numOfX + 1
    else return numOfX
  }, 0)
}

function initializeBoard(minedSquaresArr, width) {
  const freshBoard = []

  for (let i = 1; i <= width * width; i++) {
    // When a square has a mine
    if (minedSquaresArr.indexOf(i) !== -1) {
      freshBoard.push({
        num: i,
        val: 'X',
        open: false,
        flag: false,
        valueToRender: ''
      })
    }
    // WHen a square does not have a mine, get number of adjacent mines
    else {
      freshBoard.push({
        num: i,
        val: getAdjacentX(i, minedSquaresArr, width),
        open: false,
        flag: false,
        valueToRender: ''
      })
    }
  }

  return freshBoard
}