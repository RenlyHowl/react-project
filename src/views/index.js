/*导入并导出我们的页面 */
// import ArticleList from "./Article"
// import ArticleEdit from "./Article/edit"
// import Login from "./Login"
// import NotFound from "./NotFound"
// import DashBoard from "./DashBoard"
// import Settings from "./Settings"

/*下面是懒加载 */
import Loading from "./Loading"
// 导入懒加载处理的第三方包
import Loadable from "react-loadable"
const DashBoard = Loadable({
  loader: () => import("./DashBoard"),
  loading: Loading
})

const Settings = Loadable({
  loader: () => import("./Settings"),
  loading: Loading
})

const Login = Loadable({
  loader: () => import("./Login"),
  loading: Loading
})

const NotFound = Loadable({
  loader: () => import("./NotFound"),
  loading: Loading
})

const ArticleList = Loadable({
  loader: () => import("./Article"),
  loading: Loading
})

const ArticleEdit = Loadable({
  loader: () => import("./Article/edit"),
  loading: Loading
})
export {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  DashBoard,
  Settings,
  Loading
}


