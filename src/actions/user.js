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
    
     // 登录成功
     if (resp.data.code === "200") {
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





