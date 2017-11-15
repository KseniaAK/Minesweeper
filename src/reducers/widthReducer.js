import { CHANGE_WIDTH } from '../actions/index'

export default function(state = 9, action) {
  switch(action.type) {
    case CHANGE_WIDTH:
      return action.width
    default:
      return state
  }
}