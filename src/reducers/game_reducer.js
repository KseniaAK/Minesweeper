import { START_GAME, GAME_OVER } from '../actions/index'

export default function(state = false, action) {
  switch(action.type) {
    case START_GAME:
      return true

    case GAME_OVER:
      return false

    default:
      return state
  }
}