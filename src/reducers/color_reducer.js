import { CHANGE_COLOR } from '../actions/index'

export default function(state = 'white', action) {
  switch(action.type) {
    case CHANGE_COLOR:
      return action.colorNum
  
    default:
      return state
  }
}
