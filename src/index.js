import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



// 导入路由
import {
  HashRouter as Router,
  Link,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
// 导入路由匹配规则
import {
  mainRouter,
  adminRouter
} from "./routes"



// 导入less样式
import "./index.less"
ReactDOM.render( 
  <Router>
    <Switch>
      
    <Route path="/admin" render={(routerProps) => {
      // 权限 需要登录才能访问admin
      /*
      当访问的路径为/admin的时候,才渲染App组件;
      但是在渲染之前我们还需要判断是否登录了,只要登录了才能够访问我们的admin页面
      */
      return(
        <App {...routerProps}/>
      )
    }}></Route>


    {/* 下面的不需要权限访问的就直接使用我们的component,不需要使用render来渲染 */}
    {
      mainRouter.map((route) => {
        /*
        对我们的不用直接登录的路由匹配规则进行循环遍历
        */
        return(
          <Route key={route.pathname} path={route.pathname} component={route.component} />
        )
      })
    }
  {/* 
  当前当开始我们的根目录什么都没有匹配,
  第一种方式我们可以使它重定位到login页面去;
  在login页面里去判断是否有权限,如果有权限就跳转到admin页面;
  第二种方式也可以直接定位到admin页面去定位
  */}
    {/* 重定位我们的根目录 */}
    <Redirect to="/admin" from="/" exact />
    <Redirect to="/404" />
    </Switch>
    
  </Router>
  , document.getElementById('root'));