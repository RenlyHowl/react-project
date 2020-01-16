// 导入页面(组件)
import {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  DashBoard,
  Settings
} from "../views"

// 向外暴露我们的路由匹配规律
export const mainRouter = [
  {
    pathname: "/login",
    component: Login
  },
  {
    pathname: "/404",
    component: NotFound
  },
]
// mainRouter是我们不需要登录就能访问页面的路由


export const adminRouter = [
  {
    pathname: "/admin/dashboard",
    component: DashBoard
  },
  {
    pathname: "/admin/setings",
    component: Settings
  },
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true // 完全匹配
  },
  {
    pathname: "/admin/article/edit/:id",
    component: ArticleEdit
  },
]

// adminRouter是我们要登录才能访问页面的路由