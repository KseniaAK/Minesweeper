import { INITIALIZE, REVEAL, GAME_OVER, WIDTH } from '../actions/index'

function getDefaultState() {
  const defaultState = []
  for (let i = 0; i < WIDTH * WIDTH; i++) {
    defaultState.push(null)
  }
  return defaultState
}

export default function(state = getDefaultState(), action) {
  const newBoardState = [...state]
  switch(action.type) {
    case INITIALIZE:
      return initializeBoard(action.minedSquaresArr)
      
    case REVEAL:
      newBoardState[action.payload - 1].open = true
      return newBoardState

    case GAME_OVER:
      Object.keys(newBoardState).forEach((key) => {
        newBoardState[key].open = true
      })
      return newBoardState

    default:
      return state
  }
}

function getAdjacentX(currSquare, minedSqArr) {
  const adjacentSquares = [
    currSquare - WIDTH - 1,
    currSquare - WIDTH,
    currSquare - WIDTH + 1,
    currSquare - 1,
    currSquare + 1,
    currSquare + WIDTH - 1,
    currSquare + WIDTH,
    currSquare + WIDTH + 1
  ]

  // Current square is in the first row - no squares above it
  if (currSquare - WIDTH <= 0) {
    adjacentSquares[0] = null
    adjacentSquares[1] = null
    adjacentSquares[2] = null
  }
  
  // Current square is last one in the row - no squares on its right
  if (currSquare % WIDTH === 0) {
    adjacentSquares[2] = null
    adjacentSquares[4] = null
    adjacentSquares[7] = null
  }
  
  // Current square is first one in the row - no square on its left
  if (currSquare === 1 || currSquare % WIDTH === 1) {
    adjacentSquares[0] = null
    adjacentSquares[3] = null
    adjacentSquares[5] = null    
  }
  
  // Current square is in the last row - no squares below it
  if (currSquare + WIDTH > WIDTH * WIDTH) {
    adjacentSquares[5] = null
    adjacentSquares[6] = null
    adjacentSquares[7] = null
  }

  return adjacentSquares.reduce((numOfX, square) => {
    // Check whether adjacent square exists and has a mine
    if (square && (minedSqArr.indexOf(square) !== -1)) return numOfX + 1
    else return numOfX
  }, 0)
}

function initializeBoard(minedSquaresArr) {
  const freshBoard = []

  for (let i = 1; i <= WIDTH * WIDTH; i++) {
    // When a square has a mine
    if (minedSquaresArr.indexOf(i) !== -1) {
      freshBoard.push({
        num: i,
        val: 'X',
        open: false        
      })
    }
    // WHen a square does not have a mine, get number of adjacent mines
    else {
      freshBoard.push({
        num: i,
        val: getAdjacentX(i, minedSquaresArr),
        open: false        
      })
    }
  }

  return freshBoard
}