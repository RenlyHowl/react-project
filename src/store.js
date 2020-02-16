import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"

// 导入根store
import rootReducer from "./reducers/"

export default createStore(rootReducer,applyMiddleware(thunk))

