export const CHANGE_COLOR = 'CHANGE_COLOR'
export const INITIALIZE = 'INITIALIZE'

export function changeColor(color) {
  return {
    type: CHANGE_COLOR,
    payload: color
  }
}

export function initializeBoard() {
  return {
    type: INITIALIZE,
    payload: null
  }
}
