import { CHANGE_COLOR } from '../actions/index'

export default function(state = '', action) {
  switch(action.type) {
    case CHANGE_COLOR:
      return action.colorNum
  
    default:
      return state
  }
}
