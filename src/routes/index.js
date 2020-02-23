// 导入页面(组件)
import {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  DashBoard,
  Settings,
  Notification,
  NoAuth,
  Profile
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
    icon: "dashboard",
    /**
     * 绑定登录后访问页面的权限角色
     */
    role: ["001", "002", "003"]
  },

  {
    pathname: "/admin/notification",
    component: Notification,
    role: ["001", "002", "003"]
  },
  
  {
    pathname: "/admin/article",
    component: ArticleList,
    exact: true, // 完全匹配
    tittle: "文章管理",
    isNav: true,
    icon: "unordered-list",
    role: ["001", "002"]
  },
  {
    pathname: "/admin/article/edit/:id",
    component: ArticleEdit,
    role: ["001"]
  },
  {
    pathname: "/admin/settings",
    component: Settings,
    isNav: true,
    tittle: "设置",
    icon: "setting",
    role: ["001"]
  },
  {
    pathname: "/admin/noauth",
    component: NoAuth,
    role: ["001", "002", "003"]
  },
  {
    pathname: "/admin/profile", // 个人设置页面
    component: Profile,
    role: ["001", "002", "003"]
  },
]

// adminRouter是我们要登录才能访问页面的路由