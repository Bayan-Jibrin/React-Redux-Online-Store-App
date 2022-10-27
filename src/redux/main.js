import { combineReducers } from "redux"
import { allItemsReducer } from "./reducer"

const root = combineReducers({
  allItemsReducer,
})

export default root
