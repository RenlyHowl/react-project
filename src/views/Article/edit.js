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
        validateStatus= {this.state.authorValidateStatus} // 检验状态
        help = {this.state.authorHelp} // 提示信息
        >
          {getFieldDecorator('username', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              // { required: true, message: '请输入作者名称!' },
              // {min: 2, message: "作者名字必须大于2位字符"},
              // {max: 8, message: "作者名字必须小于8位字符"},
              // 我们也可以自定义规则
              {
                validator: (rule, value, callback) => {
                  // console.log(rule); // 对象
                  // console.log(value); // 输入的文本框值
                  // console.log(callback); // 回调函数
                  // console.log({rule, value, callback})
                  /**
                   * 上面Form.Item组件我们要给他添加一个validatorStatus的状态;根据我们对value值的判断
                   * 去更改validateStatus状态的改变从而改变他的样式(sucess和error);
                   * 注意验证完了之后必须要调用callback回调函数
                   */
                  if(value.length > 0 && value.length <= 4) {
                    this.setState({
                      authorValidateStatus: "error",
                      authorHelp: "作者名字必须大于4位字符"
                    })
                    // callback();
                  } else if(value.length < 8) {
                    this.setState({
                      authorValidateStatus: "success",
                      authorHelp: "作者名字可以使用"
                    })
                    // callback();
                  } else {
                    this.setState({
                      authorValidateStatus: "error",
                      authorHelp: "作者名字必须小于8位字符"
                    })
                    // callback(); //callback()函数调用加载最外层
                  }
                  callback(); //callback回调函数必须要加
                }
              }
            ], 
          })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              addonBefore={<span>作者：</span>}
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