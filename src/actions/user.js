import actionType from "./actionType"

// 导入请求用户登录的接口
import {login} from "../request/Frame"


// 开始登录的方法
const loginStart =  () => {
  return {
    type: actionType.LOGIN_START,
  }
}

// 登录成功的方法
const loginSuccess= (payLoad) => {
  return {
    type: actionType.LOGIN_SUCCESS,
    payLoad
  }
}

// 登录失败的方法
const loginFail = () => {
  /**
   * 登录失败将我们的authToken给清除
   */
  window.localStorage.removeItem("authToken");
  window.sessionStorage.removeItem("authToken");

  // 清除用户信息
  window.localStorage.removeItem("userInfo");
  window.sessionStorage.removeItem("userInfo");
  return {
    type: actionType.LOGIN_FAIL,
  }
}

// 用户登录的action
export const userLogin = (params) => {
  return dispatch => {
    const {username,password,remember} = params
    
    // 开始请求
    dispatch(loginStart());
    // 请求中
    login({
      userName: username,
      passWord: password
    })
    .then((resp) => {
    console.log(resp)
    /**
     * 我们不再request里面进行全局拦截的判断,在这里进行判断;
     * 也就是局部的处理错误
     */
    const {
      authToken,
      ...userInfo
    } = resp.data.data;
     // 登录成功
     if (resp.data.code === "200") {
      if (remember === true) {
        /**
       * 将authToken保存到本地
       */
      window.localStorage.setItem("authToken", authToken);
      // 并且将用户信息同步到本地
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        window.sessionStorage.setItem("authToken", authToken);
        window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        // 其实上面也可以存在一个里面
      }

      dispatch(loginSuccess({
        ...resp.data.data,
        remember, // 将remember传过去,也可以直接在这里就存在localStorage里
       }));

     } else {
      //  登录失败
      dispatch(loginFail())
     }

    })
  }
}

// 用户退出登录
export const logout = () => dispatch => {
  // 实际的项目中在这里要告诉服务端用户已经退出登录
  /**
   * 实际是异步事件的,要清楚我们这里的本地存储
   */
  dispatch(loginFail());
}


// 更改头像
/**参数就是我们的头像地址 */
export const changeAvatar = (avatarurl) => dispatch => {
  dispatch({
    type: actionType.CHANGE_AVATAR,
    payLoad: {
      avatarurl
    }
  });
}





