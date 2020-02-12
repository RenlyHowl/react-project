// 懒加载Loading的组件
import React from 'react'
import {
  Spin,
  // Alert
} from "antd"

export default function Loading() {
  return (
    <Spin tip="Loading...">
      {/* <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      /> */}
      </Spin>
  )
}