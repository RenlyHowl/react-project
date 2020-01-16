/* 
 * @file config-overrides.js
 * @author renlyHowl
 * 基于react-app-rewired和customize-cra的定制化配置文件
 * 创建了这个配置文件之后 同时也要对packag.json文件作出修改
 */

const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require("customize-cra")

// 导入主题文件对象
// import theme from "./theme"
const theme = require("./theme")

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd', // 如果是移动端 换成antd-mobile 安装包也是安装antd-mobile
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  }),
  // 配置装饰器写法
  addDecoratorsLegacy()
)