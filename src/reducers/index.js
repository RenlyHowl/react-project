import {combineReducers} from "redux"

// 导入notification的reducer
import notification from "./notification"
import user from "./user"

export default combineReducers({
  notification,
  user
})