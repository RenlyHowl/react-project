/*这个文件只用于解析react-loadable的原理 */

import React, {
  Component
} from "react"

//自己定义一个高阶组件用来作为懒加载使用
// 传入参数
const Loadable = ({
  loader,
  loading: Loading
}) => {
  return class Index extends Component {
    constructor() {
      super();
      this.state = {
        // 先定义已经加载的组件  初始值为null
        loadedComponent: null
      }
    }
    componentDidMount() {
      loader()
        .then((res) => {
          this.setState({
            LoadedComponent: res.default
          })
        })
    }
    render() {
      // 将state里的值解构出来
      const {
        LoadedComponent
      } = this.state;
      return (
        // 我们的render中可以直接返回null表示没有
        // null


        // 我们渲染我们传入的Loading组件
        /*这时候我们每个做出处理的页面组件显示的都是Loading组件的内容 */
        // <Loading />


        /*所以我们可以判断loadedComponent组件状态选择性渲染 */
        LoadedComponent 
        ?
        <LoadedComponent />
        :
        <Loading />


      )
    }

  }
}

export default Loadable