// 导入actionType
import actionType from "./actionType"



/**
 * 单个的改变 已读 状态的action
 */
// 传入参数id
export const markNotificationAsReadById = (id) => {
  // 异步的方法 需要返回一个dispatch
  // console.log(id) // 测试传入组件的action能否执行
  return dispatch => {
    // 这里用异步操作模拟向后端请求数据
    setTimeout(() => {
      dispatch(
        // dispatch一个同步动作
        {
          type: actionType.MARK_NOTIFICATION_BY_ID,
          payLoad: { //payLoad是我们要传过去的参数
            id  
          }
        }
      )
    }, 1000)
  }
}


/**
 * 改变所以已读状态的action
 */
export const markAllNotification = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        {
          type: actionType.MARK_ALL_NOTIFICATION,
        }
      )
    }, 1000)
  }
}