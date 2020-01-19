import React, { Component } from 'react'

// 应用antd组件库中的组件
// import {
//   Spin,
//   Alert,
//   Button
// } from "antd"
// 导入路由匹配规则
import {
  adminRouter
} from "./routes" // 需要验证登录的路由匹配规则

// 导入路由
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom"

// 导入我们的layout布局文件 Frame插件
import Frame  from "./components/Frame"

export default class App extends Component {
  render() {
    // console.log(this.props);
    return (
      <>
        {/* 渲染admin里面的页面 */}
        <Frame>

        <Switch>
        {
          adminRouter.map((route) => {
            /*
            对于admin页面里的有些内容页面,根据权限的不同我们会做权限判断;
            所以我们还是使用render方法来渲染组件
            */
            return (
              <Route key={route.pathname} path={route.pathname} render={(routerProps) => {
                return (
                  <route.component {...routerProps}></route.component>
                )
              }} exact/>
            )
          })
        }
        
        {/* 重定位到dashboard里去 */}
        <Redirect to="/admin/dashboard" from="/admin" exact></Redirect>

        {/* 也要有个404页面 */}
        <Redirect to="/404"/>
        </Switch>

        </Frame>
        
      </>
    )
  }
}


