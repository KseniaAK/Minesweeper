import { CHANGE_COLOR, REVERT_COLOR } from '../actions/index'

export default function(state = { prev: '', present: ''}, action) {
  switch(action.type) {
    case CHANGE_COLOR:
      // save previous color in case player loses - on new game, want to revert to prev color
      return Object.assign({}, {
        past: state.present,
        present: action.colorNum
      })
  
    case REVERT_COLOR:
      return Object.assign({}, {
        past: '',
        present: state.past
      })
    default:
      return state
  }
}
