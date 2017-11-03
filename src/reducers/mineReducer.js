import { CHANGE_MINE_NUM } from '../actions/index'

export default function(state = 18, action) {
  switch(action.type) {
    case CHANGE_MINE_NUM:
      return action.mineNum

    default:
      return state
  }
}