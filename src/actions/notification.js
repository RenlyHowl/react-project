// 导入actionType
import actionType from "./actionType"

// 导入请求消息列表的方法
import {getNotification} from "../request/Frame"


// 开始请求
const startMark = () => {
  return {
    type: actionType.START_MARK
  }
}

// 请求完成
const finishMark = () => {
  return {
    type: actionType.FINSH_MARK
  }
}

/**
 * 单个的改变 已读 状态的action
 */
// 传入参数id
export const markNotificationAsReadById = (id) => {
  // 异步的方法 需要返回一个dispatch
  // console.log(id) // 测试传入组件的action能否执行

  

  return dispatch => {
    // 这里用异步操作模拟向后端请求数据
    // 开始请求
    dispatch(startMark());

    setTimeout(() => {
      dispatch(
        // dispatch一个同步动作
        {
          type: actionType.MARK_NOTIFICATION_BY_ID,
          payLoad: { //payLoad是我们要传过去的参数
            id  
          }
        }
      );

      // 请求完成
      dispatch(
        finishMark()
      )
    }, 1000)
  }
}


/**
 * 改变所以已读状态的action
 */
export const markAllNotification = () => {
  return dispatch => {
    // 开始请求
    dispatch(startMark());

    setTimeout(() => {
      dispatch(
        {
          type: actionType.MARK_ALL_NOTIFICATION,
        }
      );

      // 请求完成
      dispatch(
        finishMark()
      )
    }, 1000)
  }
}

// 请求列表数据的action
/**
 * 不要忘记在Frame组件中调用;其实也可以在App组件中调用
 */
export const getNotificationList = () => {
  return dispatch => {
    // 开始请求
    dispatch(startMark());
    
    getNotification()
    .then((resp) => {
      // console.log({...resp, type: actionType.RECEIVE_NOTIFICATION}) // 可以接收到
      /**将数据赋值给state;所以我们也需要一个actionType */
      dispatch({
        ...resp, 
        type: actionType.RECEIVE_NOTIFICATION
      });

      
      // 请求完成
      dispatch(
        finishMark()
      )
    })
    // .finally(() => {
    //   // 请求完成
    //   dispatch(
    //     finishMark()
    //   )
    // })
  }
}