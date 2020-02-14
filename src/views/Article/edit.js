import React, { Component } from 'react'


import {
  Card,
  Button,
  Form, 
  Icon, 
  Input,
  Row,
  Col,
  DatePicker, //选择时间组件
} from "antd" 

import zhCN from "antd/es/locale/zh_CN"

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
    /**Form.Item布局 */
    const formItemLayout = {
      labelCol: { // 设置标签的col
        /**
         * col-sm- 平板 - 屏幕宽度等于或大于 576px
         * col-md- 桌面显示器 - 屏幕宽度等于或大于 768px)
         * col-lg- 大桌面显示器 - 屏幕宽度等于或大于 992px)
         * col-xl- 超大桌面显示器 - 屏幕宽度等于或大于 1200px)
         */
        // xs: { span: 24},
        sm: { span: 24},
        xl: {span: 2}
      },
      wrapperCol: {// 设置input标签的col
        // xs: { span: 24 }, //超小
        sm: { span: 24 },// 当屏幕尺寸大于576小于768
        xl: {span: 22}
      },
    };
    return (
      <Card title={"编辑文章"} extra={<Button type="primary" onClick={this.cancelHandler}>取消</Button>} style={{ width: "100%" }}>
        {/* 这里这个handleSumbit的方法 是我们下面的按钮点击之后的方法 */}
        <Form 
        onSubmit={this.handleSubmit} 
        className="login-form"
        {...formItemLayout}
        >
        {/* 文章标题字段 */}
        <Form.Item 
        label="标题"
        >
          {getFieldDecorator('title', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              { required: true, message: '请输入标题名称!' },
              {min: 2, message: "标题必须大于2位字符"},
              {max: 8, message: "标题必须小于8位字符"},
              
            ], 
          })(<Input
              // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} // 不要图标
              prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="标题"
            />
          )}
        </Form.Item>

        


        {/* 作者字段 */}
        <Form.Item 
        /**
         * 使用rules的校验规则就不需要下面的校验状态和提示信息了
         */
        // validateStatus= {this.state.authorValidateStatus} // 检验状态
        // help = {this.state.authorHelp} // 提示信息
        label="作者" // 我们还要添加布局方式 labelCol和wrapperCol 可以参考我们的Grid栅格组件
        /**Form表单已经帮我们做了这些 */
        >
          {getFieldDecorator('author', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              { required: true, message: '请输入作者名称!' },
              {min: 2, message: "作者名字必须大于2位字符"},
              {max: 8, message: "作者名字必须小于8位字符"},
              
            ], 
          })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="作者"
              // addonBefore={<span>作者：</span>} // 这里前面的作者我们使用Item里的label属性
            />
          )}
        </Form.Item>


        {/* 阅读量字段 */}
        <Form.Item 
        label="阅读量"
        >
          {getFieldDecorator('amount', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              { required: true, message: '请输入阅读量!' },
              {pattern: /^(?:\d{1,3}|1000)$/,  message: '请输入1-1000的数字!'}   //使用正则表达式来校验
            ], 
          })(<Input
            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="阅读量"
            />
          )}
        </Form.Item>

        
        {/* 创建时间字段 */}
        <Form.Item 
        label="创建时间"
        >
          {getFieldDecorator('createAt', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              { type: 'object', required: true, message: '请选择日期!' }
            ], 
          })(
            <DatePicker 
            showTime format="YYYY-MM-DD HH:mm:ss" 
            locale={zhCN}
            />,
          )}
        </Form.Item>

        
        {/* 创建文章内容字段 */}
        <Form.Item 
        label="文章内容"
        >
          {getFieldDecorator('content', { // username这个名字就是我们在输入框获取到信息提交的字段名
            rules: [// 匹配规则 提示信息 数组的形式
              {required: true, message: '请输入内容!' }
            ], 
          })(
            // 内容输入不可能使用input输入框
            <textarea 
            placeholder="请输入文章内容"
            style={{width: "100%", resize: "none", height: "500px", overflow: "auto", fontSize: "14px"}}
            ></textarea>
            /**
             * 也不能使用textarea,因为我们可能需要传一些图片
             */
            // 我们这里需要使用一个富文本编辑器

          )}
        </Form.Item>

        {/* 按钮 */}
        {/* <Row type="flex" justify="center">
        <Col span={8} offset={4}>
        
        </Col>
        </Row>
         */}

        {/* 我们发现Button组件对不起,所以我们可以一样的使用Form.Item组件来渲染 */}
        
        <Form.Item 
        wrapperCol={{offset: 2}}
        >
        <Button type="primary" htmlType="submit" className="login-form-button">
        保存修改
        </Button>
        </Form.Item>
          
        
        

        </Form>


      
      </Card>

    )
  }
}


export default  Edit