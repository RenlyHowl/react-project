/*导入并导出我们的页面 */
// 第一种方式
import ArticleList from "./Article"
import ArticleEdit from "./Article/edit"
import Login from "./Login"
import NotFound from "./NotFound"
import DashBoard from "./DashBoard"
import Settings from "./Settings"
export default {
  ArticleList,
  ArticleEdit,
  Login,
  NotFound,
  DashBoard,
  Settings
}


// 统一导出我们的页面(组件)
// 第二种方式
// export {default as NotFound} from "./NotFound"
// export {default as DashBoard} from "./DashBoard"
// export {default as Login} from "./Login"
// export {default as ArticleList} from "./Article"
// export {default as ArticleEdit} from "./Article/edit"
// export {default as Settings} from "./Settings"

