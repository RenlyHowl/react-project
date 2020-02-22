
import actionType from "../actions/actionType"

/**
 * isLogin是否登录的状态就应该根据是否能从本地取到authToken的值来定
 */
const isLogin = Boolean(localStorage.getItem("authToken")) || Boolean(sessionStorage.getItem("authToken"))

// 取用户信息
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || JSON.parse(sessionStorage.getItem("userInfo"))


const initState =  {
  /*
  id: userInfo.id || "",
  avatar: userInfo.avatar || "",
  displayName: userInfo.displayName || "",
  role: userInfo.role || "",
  */
  // 不要使用上面的形式渲染,直接使用...的方式解构对象
  ...userInfo,
  isLogin: isLogin, //登录状态 
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
    /**
     * 这里不能返回initState,因为在我们做退出登录的时候state的值要全部清除;
     * 其实也可以将上面初始化值写成一个方法也可以
     */
    return {
      id: "",
      avatar: "",
      displayName: "",
      role: "",
      isLogin: false,
      isLoading: false,
    };
    default: 
    return state;
  }
}

export default userReducer