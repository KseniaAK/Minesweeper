import { combineReducers } from 'redux'
import ColorReducer from './colorReducer'
import BoardReducer from './boardReducer'
import GameReducer from './gameReducer'
import MineReducer from './mineReducer'

const rootReducer = combineReducers({
  colorNum: ColorReducer,
  boardConfig: BoardReducer,
  gameOn: GameReducer,
  mineNum: MineReducer
})

export default rootReducer