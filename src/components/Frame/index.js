import React, { Component } from 'react'

// 引入connect
import {connect} from "react-redux"

import { 
  Layout,
  Menu, 
  // Breadcrumb, 
  Icon ,
  Dropdown,
  Typography,
  Avatar, // 头像展示
  Badge
} from 'antd';

// 导入logo图片
import logo from "./logo.png"
// 导入我们的样式
import "./frame.less"
// 导入路由
import {
  // Link,
  withRouter 
} from "react-router-dom"

// 导入路由匹配规则
import {adminRouter} from "../../routes"
// const { SubMenu } = Menu; // 没有用到subMenu
const { Header, Content, Sider } = Layout;



const mapStateToProps = state => {
  // const status = state.notification.list.find(item => item.hasRead === false);
  return {
    // 只需要返回未读的数据条数
    notificationCount: state.notification.list.filter(item => item.hasRead === false).length, // 返回数组的长度

    //返回通知信息的状态
    // notificationStatus: status //返回的是一个对象 没有找到为undefined 找到了就为一个对象

    /**也可以不用这样,直接通过我们上面的数组的长度为多少,为0就代表全已读false;
     * 我们通过Boolean来取布尔值
     */
  }
}
// 使用高阶组件嵌套暴露Frame组件
@connect(mapStateToProps)
@withRouter
class Frame extends Component {
  onMenuClick = ({key}) => {
    // console.log({item, key, keypath, donEvent});// 注意:传的是个对象
    // console.log(this.props)
    /*
    key是我们点击的当前Menu.Item的key;(所以使用我们下面渲染的时候使用pathname)
    item是我们点击渲染的当前Menu.Item;
    keypath是数组形式的key,
    domEvent是我们的点击事件对象
    */
   this.props.history.push(key) // 使用history下的push方法跳转
  }
  dropdown = ({key}) => {// { item, key, keyPath, domEvent }
    // console.log({ item, key, keyPath, domEvent });
    /**跳转到对应页面;
     * 我们不能只是简单的进行跳转,如果是退出登入的话,我们还要进行登入信息的清除
     */
    this.props.history.push(key);
    
  }
  // 下拉菜单的设置
  menu = (
    <Menu onClick={this.dropdown}>
      <Menu.Item key="/admin/notification">
        {/* 有消息 通知中心上显示小红点 */}
      <Badge 
      // dot={this.props.notificationStatus? true: false}
      dot={Boolean(this.props.notificationCount)}
      >
          通知中心
      </Badge>
      </Menu.Item>

      <Menu.Item key="/admin/settings"> 
          个人设置
      </Menu.Item>

      <Menu.Item key="/login">
          退出登入
      </Menu.Item>
    </Menu>
  );

  render() {
    console.log(this.props)
    // 对导入的adminRouter进行处理 在渲染
    const menu = adminRouter.filter(item => item.isNav === true)
    return (
      <Layout style={{minHeight: "100%"}}>
        {/* 下面下拉菜单不显示;设置display为flex */}
    <Header className="header qf-header" style={{backgroundColor: "#fff", display: "flex"}}>
      <div className="qf-logo">
      {/* <img src="./logo.png" /> */}
      <img src={logo} height="40px" alt="logo" />
      </div>

      {/* 右上角的UI部分 */}
      <Dropdown overlay={this.menu} trigger={["hover"]}>
        {/* 设置居中对齐 */}
      <div className="ant-dropdown-link" style={{cursor: "pointer", display: "flex", alignItems: "center"}}>
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Badge 
        count={this.props.notificationCount} // 渲染数字
        offset={[10, -10]}
        >
        <Typography.Text strong>欢迎您,Renly!</Typography.Text> 
        </Badge>
        
        <Icon type="down" />
      </div>
      </Dropdown>

    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          // defaultSelectedKeys={['仪表盘']} // 默认选中仪表盘
          /*默认选中 与标题栏一样的菜单 */
          // defaultSelectedKeys={[this.props.location.pathname]}
          selectedKeys={["/" + this.props.location.pathname.split("/")[1] + "/" + this.props.location.pathname.split("/")[2]]} // 这里就用这个pathname前面的两端
          // 使用Onclick属性 定义一个onMenuClick方法
          onClick={this.onMenuClick}
          style={{ height: '100%', borderRight: 0 }}
        >
            {/* <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item> */}
          {/* 进行各级菜单的渲染 */}
          {
            menu.map((item) => {
              return (

                /*使用Link来实现点击实现菜单切换显示 */
              // <Menu.Item key={item.tittle}>
              //   <Link to={item.pathname}>
              //   <Icon type={item.icon} />
              //   {item.tittle}
              //   </Link>
              // </Menu.Item>

              /*使用上面的Onclick属性实现 */
              <Menu.Item key={item.pathname}>
              <Icon type={item.icon} />
              {item.tittle}
              </Menu.Item>   
              )
            })
          }
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 0' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          style={{
            background: '#fff',
            padding: 0,
            margin: 0,
            minHeight: "100%",
          }}
        >
          {/* 使用this.props.children渲染我们的admin网页内容 */}
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
    )
  }
}

export default Frame