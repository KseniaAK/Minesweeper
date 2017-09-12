import { combineReducers } from 'redux'
import ColorReducer from './color_reducer'
import BoardReducer from './board_reducer'

const rootReducer = combineReducers({
  color: ColorReducer,
  boardConfig: BoardReducer
})

export default rootReducer