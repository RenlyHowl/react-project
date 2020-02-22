import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from "react-redux"
import store from "./store"

// 导入路由
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
// 导入路由匹配规则
import {
  mainRouter
} from "./routes"

// 引用redux通信的store


// 导入antd组件库
import {ConfigProvider} from "antd"
import zhCN from "antd/es/locale/zh_CN"


// 导入less样式
import "./index.less"
ReactDOM.render( 
  // 使用Provider进行包裹,使得包裹的组件进行redux通信
  <Provider store={store}>

<ConfigProvider locale={zhCN}>
<Router>
    <Switch>
      
    <Route path="/admin" render={(routerProps) => {
      /**
       * 权限认证 从store里取isLogin的登录状态(这里要用getState方法才能获取到state)
       */
      // return (
      //   store.getState().user.isLogin 
      // ? 
      // <App {...routerProps}/> 
      // : 
      // <Redirect to="/login" />
      // )
      return <App {...routerProps}/> 
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
</ConfigProvider>

  </Provider>
  , document.getElementById('root'));