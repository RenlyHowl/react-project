// 导入actionType进行比较
import actionType from "../actions/actionType"

const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      hasRead: false,
      title: 'Ant Design Title 1',
      content: "Ant Design  1"
    },
    {
      id: 2,
      hasRead: false,
      title: 'Ant Design Title 2',
      content: "Ant Design  2"
    },
    {
      id: 3,
      hasRead: true,
      title: 'Ant Design Title 3',
      content: "Ant Design  3"
    },
    {
      id: 4,
      hasRead: true,
      title: 'Ant Design Title 4',
      content: "Ant Design  4"
    },
  ]
}

const notificationReducer = (state = initState, action) => {
  switch(action.type) {
    case actionType.MARK_NOTIFICATION_BY_ID: 
    // console.log("进行取反"); //测试能够dispatch出来
    const newList = state.list.map((item) => {
      if(item.id === action.payLoad.id) {
        item.hasRead = true
      }
      return item;
    });
    return {
      ...state,
      list: newList
    }
    case actionType.MARK_ALL_NOTIFICATION:
      return {
        ...state,
        list: state.list.map((item) => {
          item.hasRead = true;
          return item;
        })
      }
    default:
      return state
  }

}
export default  notificationReducer