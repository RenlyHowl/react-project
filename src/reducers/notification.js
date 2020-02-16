
const initState = {
  isLoading: false,
  list: [
    {
      id: 1,
      hasRead: true,
      title: 'Ant Design Title 1',
      content: "Ant Design  1"
    },
    {
      id: 2,
      hasRead: true,
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
    
    default:
      return state
  }
}
export default  notificationReducer