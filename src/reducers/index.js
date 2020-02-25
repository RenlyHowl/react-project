import {combineReducers} from "redux"

// 导入notification的reducer
import notification from "./notification"
import user from "./user"
import counter from "./counter"
export default combineReducers({
  notification,
  user,
  counter
})