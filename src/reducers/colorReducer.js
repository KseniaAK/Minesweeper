import { CHANGE_COLOR, REVERT_COLOR } from '../actions/index'

// default initial color is numbered 0 in CSS color constants

export default function(state = { prev: '', present: '0'}, action) {
  switch(action.type) {
    case CHANGE_COLOR:
      // save previous color in case player loses - on new game, want to revert to prev color
      // if player lost and current color is gameOver - don't allow board color to change until newGame has been started
      return Object.assign({}, {
        past: (state.present === 'gameOver') ? state.past : state.present,
        present: (state.present === 'gameOver') ? state.present : action.colorNum
      })
  
    case REVERT_COLOR:
      // go back to board color before the player lost and color changed to gameOver
      // don't care about saving previous color here, as it is gameOver color, not a player-set preference
      // do not change color on pressing newGame button if previous color was not gameOver
      return Object.assign({}, {
        past: '',
        present: (state.present === 'gameOver') ? state.past : state.present
      })
    default:
      return state
  }
}
