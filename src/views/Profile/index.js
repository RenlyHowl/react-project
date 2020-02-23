import React, { Component } from 'react'

import {
  Upload,
  Card
} from "antd"

export default class Profile extends Component {
  render() {
    return (
      <Card
      title="个人设置页面"
      bordered={false} // 取消边框
      >
      <Upload></Upload>
      
      </Card>
    )
  }
}
