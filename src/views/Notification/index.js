import React, { Component } from 'react'


// 导入要使用的store
import {connect} from "react-redux"
// 引入action中对应的notification
import {
  markNotificationAsReadById,
  markAllNotification
} from "../../actions/notification"


import {
  Card,
  Button,
  List,
  Avatar,
  Badge
} from "antd"
// 假数据
// const data = [
//   {
//     title: 'Ant Design Title 1',
//     content: "Ant Design Title 1"
//   },
//   {
//     title: 'Ant Design Title 2',
//     content: "Ant Design Title 2"
//   },
//   {
//     title: 'Ant Design Title 3',
//     content: "Ant Design Title 3"
//   },
//   {
//     title: 'Ant Design Title 4',
//     content: "Ant Design Title 4"
//   },
// ];
const mapStateToProps = state => {
  const {
    list = [] //让他默认值为空
  } = state.notification
  return {
    list
  }
}
// 可以在第二个参数挂载到props上
@connect(mapStateToProps,{markNotificationAsReadById, markAllNotification})
class Notification extends Component {
  render() {
    // console.log(this.props); //发现this.props上已经挂载了我们的store
    return (
      <>
      <Card 
      title="Default size card" 
      bordered={false}
      extra={<Button onClick={this.props.markAllNotification}  disabled={this.props.list.every(item => item.hasRead === true)}>全部标记为已读</Button>} 
      // style={{ width: 300 }}
      >
        {/* 使用List组件来做通知信息的渲染 */}
        <List
          itemLayout="horizontal"
          dataSource={this.props.list} //使用我们store的数据
          renderItem={item => (
            <List.Item
            // 方法后面也可以使用bind改变this的指向
            extra={item.hasRead ? null : <Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button>}          
            >
              <List.Item.Meta
                  //未读显示为红点 
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<Badge dot={!item.hasRead} offset={[0, 0]}> {item.title}</Badge>}
                // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                description={item.content}
              />
            </List.Item>
          )}
          /**
           * 也可以做分页
           */
          pagination={{
            total:100, // 总的数据为100条 默认每页10条
            defaultPageSize: 10,
            showQuickJumper: true, // 开启可以快速跳转页码
            showSizeChanger: true, // 开启可以更改pageSize
            pageSizeOptions: ['10', '20', '30', '50'], // 设置更改显示每页数据的
          }}
        />,

      </Card>

      </>
    )
  }
}
export default Notification
// const mapStateToProps = state => {
//   const {
//     list = [] //让他默认值为空
//   } = state.notification
//   return {
//     list
//   }
// }
// export default connect(mapStateToProps, {markNotificationAsReadById})(Notification)