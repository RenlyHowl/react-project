/*
* 登录页面
*/

import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Icon,
  Card
} from "antd"




//  导入样式
import "./index.less"
// 我们引入样式 不使用下面的响应式布局



// Form布局设置
// const wrapperCol = { // 做成居中的效果
//   span: 6,
//   offset: 9
// }


/**
 * 为了自适应屏幕的响应式布局
 */
// const wrapperCol = {
//   xs: { // 小屏
//     span: 24,
//     offset: 0
//   },
//   md: {
//     span: 6,
//     offset: 9
    
//   }
// }

@Form.create()
class Login extends Component {
  handleSubmit = (e)=> {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
     <Card
    //  style={{height: "100%", background:"#fffff url('./login.jpg') no-repeat fixed top"}}
     title="Qf-Admin登录"
     className="qf-login-wrapper"
     >
        <Form 
      onSubmit={this.handleSubmit} 
      className="login-form"
      // wrapperCol={wrapperCol}
      >
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名必须!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码必须!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item
        wrapperCol={{span: 18, offset:3}}
        >
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100px"}}>
            登录
          </Button>
        </Form.Item>
      </Form>
     </Card>
    )
  }
}

export default Login