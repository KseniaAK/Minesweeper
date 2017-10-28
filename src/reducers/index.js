import { combineReducers } from 'redux'
import ColorReducer from './colorReducer'
import BoardReducer from './boardReducer'
import GameReducer from './gameReducer'

const rootReducer = combineReducers({
  colorNum: ColorReducer,
  boardConfig: BoardReducer,
  gameOn: GameReducer
})

export default rootReducer