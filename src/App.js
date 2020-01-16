import React, { Component } from 'react'

// 应用antd组件库中的组件
import {
  Spin,
  Alert,
  Button
} from "antd"
// 导入路由匹配规则
import {
  adminRouter
} from "./routes" // 需要验证登录的路由匹配规则

// 导入路由
import {
  Route,
  Switch,
  Link,
  Redirect,
  Loading  // 懒加载之前显示的组件
} from "react-router-dom"


export default class App extends Component {
  render() {
    // console.log(this.props);
    return (
      <>
        <div>
          {/* 这里可以写一些公共的部分;比如导航栏 */}
          这是公共的部分
        </div>
        {/* 渲染admin里面的页面 */}
        
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
      </>
    )
  }
}


