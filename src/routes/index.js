// 导入页面(组件)
import {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  DashBoard,
  Settings,
  Notification
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
  }
]
// mainRouter是我们不需要登录就能访问页面的路由


export const adminRouter = [
  {
    pathname: "/admin/dashboard",
    component: DashBoard,
    tittle: "仪表盘",
    isNav: true,
    icon: "dashboard"
  },

  {
    pathname: "/admin/notification",
    component: Notification,
    /**
     * Notification不需要设置菜单页
     */
    // tittle: "通知中心",
    // isNav: true,
    // icon: "notification"
  },
  
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true, // 完全匹配
    tittle: "文章管理",
    isNav: true,
    icon: "unordered-list"
    /* 如果我们这里配置了children的话;
    在App组件里面就得在内层里面再次的循环渲染内存的子组件;
    要不然children不能渲染出来*/
  },
  {
    pathname: "/admin/article/edit/:id",
    component: ArticleEdit
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    isNav: true,
    tittle: "设置",
    icon: "setting"
  },
]

// adminRouter是我们要登录才能访问页面的路由