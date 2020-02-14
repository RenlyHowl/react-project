import React, { Component } from 'react'


import {
  Card,
  Button,
  Form, 
  Icon, 
  Input,
  Checkbox,
  message
} from "antd" 


@Form.create() // 这里跟样例 可以不要里面的这个对象
class Edit extends Component {
  constructor() {
    super();
    this.state = {
      authorValidateStatus: "validating", // 校验状态 可选有'success' 'warning' 'error' 'validating'
      authorHelp: ""
    }
  }
  
  // 取消的函数
  cancelHandler = () => {
    this.props.history.go(-1)
  }
  
  handleSubmit = e => {
    e.preventDefault();// 阻止默认行为
    /**下面的这个方法替我们去做错误的验证 */
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values); // 没有错误 就后台打印
      }
    });
  };
  render() {
    // console.log(this.props);
    /**
     * 我们发现每次在这个input输入框输入文字的时候都会重新渲染一遍组件
     */

    /**
     * 通过this.props.location.state.title可以去到传过来的参数title
     */
    const { getFieldDecorator } = this.props.form;// 我们加了上面这个高阶组件就可以 解构 得到this.props里的form了
    return (
      <Card title={"编辑文章"} extra={<Button type="primary" onClick={this.cancelHandler}>取消</Button>} style={{ width: "100%" }}>
        {/* 这里这个handleSumbit的方法 是我们下面的按钮点击之后的方法 */}
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item 
        /**
         * 使用rules的校验规则就不需要下面的校验状态和提示信息了
         */
        // validateStatus= {this.state.authorValidateStatus} // 检验状态
        // help = {this.state.authorHelp} // 提示信息
        label="作者"
        >
          {getFieldDecorator('username', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              { required: true, message: '请输入作者名称!' },
              {min: 2, message: "作者名字必须大于2位字符"},
              {max: 8, message: "作者名字必须小于8位字符"},
              
            ], 
          })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              // addonBefore={<span>作者：</span>} // 这里前面的作者我们使用Item里的label属性
            />
          )}
        </Form.Item>

        {/* 按钮 */}
        <Button type="primary" htmlType="submit" className="login-form-button">
            提交修改
        </Button>

        </Form>


      
      </Card>

    )
  }
}


export default  Edit