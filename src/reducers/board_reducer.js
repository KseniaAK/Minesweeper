import { INITIALIZE, REVEAL, GAME_OVER } from '../actions/index'

const WIDTH = 9
const MAX_MINES = 18
const defaultState = []

for (let i = 0; i <= WIDTH * WIDTH; i++) {
  defaultState.push({
    num: i,
    val: '',
    open: false
  })
}

export default function(state = initializeBoard(), action) {
  const newBoardState = [...state]
  switch(action.type) {
    case INITIALIZE:
      return initializeBoard()
      
    case REVEAL:
      newBoardState[action.payload - 1].open = true
      return newBoardState

    case GAME_OVER:
      Object.keys(newBoardState).forEach((key) => {
        newBoardState[key].open = true
      })
      return newBoardState
  
  }
  return state
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

function initializeBoard() {
  const freshBoard = []
  const minedSquares = getMinedSquares()

  for (let i = 1; i <= WIDTH * WIDTH; i++) {
    // When a square has a mine
    if (minedSquares.indexOf(i) !== -1) {
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
        val: getAdjacentX(i, minedSquares),
        open: false        
      })
    }
  }

  return freshBoard
}