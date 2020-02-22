
import actionType from "../actions/actionType"

const initState =  {
  id: "",
  avatar: "",
  displayName: "",
  role: "",
  authToken: "", // token不是放在这儿
  isLogin: false, //登录状态 默认为false
  isLoading: false, // 现在是否处在登录中 (登录的时候不允许我们去点)
}

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case actionType.LOGIN_START:
    return {
      ...state,
      // isLoading: action.payLoad.isLoading // 将isLoading的状态直接在reducer里设置
      isLoading: true,
    };
    case actionType.LOGIN_SUCCESS:
    return {
      ...state,
      ...action.payLoad,
      isLoading: false,
      isLogin: true
    };
    case actionType.LOGIN_FAIL:
    // 登录失败 返回initState
    return initState;
    default: 
    return state;
  }
}

export default userReducer