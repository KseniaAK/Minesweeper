export const CHANGE_COLOR = 'CHANGE_COLOR'
export const INITIALIZE = 'INITIALIZE'
export const REVEAL = 'REVEAL'
export const GAME_OVER = 'GAME_OVER'
export const WIDTH = 9
const MAX_MINES = 18

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    payload: color
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
    payload: squareNum
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