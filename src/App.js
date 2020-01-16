import React, { Component } from 'react'

// 应用antd组件库中的组件
import {
  Spin,
  Alert,
  Button
} from "antd"

// 定义一个高阶组件测试用
const testComponent = (YourComponent) => {
  return class HighComponent extends Component {
    render() {
      return (
        <>
        <h1>我是高阶组件</h1>
          <YourComponent />
        </>
      )
    }
  }
}
//装饰器写法
@testComponent
class App extends Component {
  render() {
    return (
      <div>
      app
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
      <Button type="primary">测试开关</Button>
      </div>
    )
  }
}

// export default TestComponent(App)

// 装饰器写法
export default App
