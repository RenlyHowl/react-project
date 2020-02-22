import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

// 导入根store
import rootReducer from "./reducers/index"

export default createStore(rootReducer,applyMiddleware(thunk))

