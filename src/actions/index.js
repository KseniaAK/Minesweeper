export const CHANGE_COLOR = 'CHANGE_COLOR'
export const INITIALIZE = 'INITIALIZE'
export const REVEAL = 'REVEAL'
export const GAME_OVER = 'GAME_OVER'

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    payload: color
  }
}

export function initializeBoard() {
  return {
    type: INITIALIZE
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
