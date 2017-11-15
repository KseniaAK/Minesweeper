import { combineReducers } from 'redux'
import ColorReducer from './colorReducer'
import BoardReducer from './boardReducer'
import GameReducer from './gameReducer'
import MineReducer from './mineReducer'
import WidthReducer from './widthReducer'

const rootReducer = combineReducers({
  colorNum: ColorReducer,
  boardConfig: BoardReducer,
  gameOn: GameReducer,
  selectedMineNum: MineReducer,
  selectedWidth: WidthReducer
})

export default rootReducer