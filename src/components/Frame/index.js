import React, { Component } from 'react'

import { 
  Layout,
  Menu, 
  // Breadcrumb, 
  Icon 
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



// 使用高阶组件嵌套暴露Frame组件
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
  render() {
    // 对导入的adminRouter进行处理 在渲染
    const menu = adminRouter.filter(item => item.isNav === true)
    return (
      <Layout style={{minHeight: "100%"}}>
    <Header className="header qf-header" style={{backgroundColor: "#fff"}}>
      <div className="qf-logo">
      {/* <img src="./logo.png" /> */}
      <img src={logo} height="40px" alt="logo" />
      </div>
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