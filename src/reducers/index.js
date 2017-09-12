import { combineReducers } from 'redux'
import ColorReducer from './color_reducer'

const rootReducer = combineReducers({
  color: ColorReducer
})

export default rootReducer