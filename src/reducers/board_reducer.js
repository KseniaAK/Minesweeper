import { INITIALIZE } from '../actions/index'

const width = 9
const maxMines = 10
const defaultState = []

for (let i = 0; i <= width * width; i++) {
  defaultState.push({
    num: i,
    val: '' 
  })
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case INITIALIZE:
    return initializeBoard()
  }
  return state
}

function generateLocation(minedSqArr) {
  // Random number - position of mine
  // Minimum 1, maximum width * width
  const mineLocation = Math.floor(Math.random() * (width * width) + 1)
  if (minedSqArr.indexOf(mineLocation) !== -1) return generateLocation(minedSqArr);
  return mineLocation
}

function getMinedSquares() {
  const minedSq = []
  for (let i = 0; i < maxMines; i++) {
    minedSq.push(generateLocation(minedSq))
  }
  return minedSq
}

function initializeBoard() {
  const freshBoard = []
  const minedSquares = getMinedSquares()
  
  for (let i = 1; i <= width * width; i++) {
    if (minedSquares.indexOf(i) !== -1) {
      freshBoard.push({
        num: i,
        val: 'X' 
      })
    }
    else {
      freshBoard.push({
        num: i,
        val: '' 
      })
    }
  }

  return freshBoard
}