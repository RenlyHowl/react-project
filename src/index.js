import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';



// 导入路由
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom"
// 导入路由匹配规则
import {mainRouter, adminRouter} from "./routes"



// 导入less样式
import "./index.less"
ReactDOM.render(
    <App />
  , document.getElementById('root'));


