import { combineReducers } from 'redux'
import ColorReducer from './color_reducer'
import BoardReducer from './board_reducer'
import GameReducer from './game_reducer'

const rootReducer = combineReducers({
  colorNum: ColorReducer,
  boardConfig: BoardReducer,
  gameOn: GameReducer
})

export default rootReducer