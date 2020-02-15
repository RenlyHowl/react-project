import React, { Component, createRef } from 'react'

// 引入wangeditor富文本编辑器
import wangEditor  from "wangeditor"

// 引入编辑数据的方法
import {
  editArticle,
  saveArticle
} from "../../request/Frame"
import {
  Card,
  Button,
  Form, 
  Icon, 
  Input,
  message,
  DatePicker, //选择时间组件
  Spin
} from "antd" 
// 导入moment
import moment from "moment"

import zhCN from "antd/es/locale/zh_CN"
// 引入富文本编辑器的样式
import "./edit.less"

@Form.create() // 这里跟样例 可以不要里面的这个对象
class Edit extends Component {
  constructor() {
    super();
    // 创建富文本编辑器的ref
    this.editorRef = createRef();
    this.state = {
      authorValidateStatus: "validating", // 校验状态 可选有'success' 'warning' 'error' 'validating'
      authorHelp: "",
      spinStatus: false, // 加载中组件的状态
      spinTip: "", // 加载时的提示
    }
  }
  
  // 取消的函数
  cancelHandler = () => {
    // console.log(this.props.history)
    // this.props.history.go(-1)
    this.props.history.goBack();
  }
  

  handleSubmit = e => {
    e.preventDefault();// 阻止默认行为
    /**下面的这个方法替我们去做错误的验证 */
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values); // 没有错误 就后台打印
        /**通过我们上面打印这些值 可以发现createAt是一个moment对象;我们需要把它转成时间戳 */
        // console.log(values.createAt.valueOf()) // 通过valueOf方法可以转成时间戳

        /**
         * 向后端发送请求保存我们的编辑文章数据
         */
        // 处理我们要发生请求的参数
        // let {createAt, ...data} = values;
        // createAt = values.createAt.valueOf();
        // let params = {createAt, ...data}
        // console.log(params)
        /**也可以下面这样 */
        const params = Object.assign({}, values, {
          createAt: values.createAt.valueOf()
        })
        // console.log(params);
        this.setState({
          spinStatus: true,
          spinTip: "正在保存中"
        })
        saveArticle(this.props.match.params.id, params)
        .then((resp) => {
          // console.log(resp) //能够拿到返回的信息
          // message.success(resp.msg, 0.5); // 弹出提示框
          /**
           * 保存成功后;根据需求看是否需要留在当前页面
           */
          // this.props.history.push("/admin/article")
          /**上面这两个写在一个函数里 */
          message.success(resp.msg, 0.5, () => {
            this.props.history.push("/admin/article")
          })
        })
        .finally(() => {
          this.setState({
            spinStatus: false
          })
        })
      }
    });
  };

  initEditor = () => {
    // 新建一个编辑器
    // const editor = new wangEditor(this.editorRef.current);// 注意要加current
    // editor.create();
    /**
     * 这里我们挂载到组件上;
     * 挂载到组件上更好一点
     */
    this.editor = new wangEditor(this.editorRef.current);// 注意要加current
    this.editor.customConfig.onchange =  (html) => { // 这里要写成箭头函数,不能this的指向会出问题
      // html 即变化之后的内容
      /**
       * 编辑器的值 复制到对应控件的值身上
       */
    /**
     * 如果是input控件就不用调用下面的API去手动的设置;
     */
    this.props.form.setFieldsValue({
      content: html,// 将值赋值到content字段上 
    });
  }
    this.editor.create();
  }

  // 请求渲染数据的方法
  getData = () => {
    // console.log(this.props)
    /**
     * 这里id的获取是通过this.props.match.params.id来获取的
     */

    // 设置加载组件的状态
    this.setState({
      spinStatus: true,
      spinTip: "数据加载中"
    })
    editArticle(this.props.match.params.id)
    .then((resp) => {
      // console.log(resp)
      /**获取到数据之后我们需要给他去setFiledsValue */
      // this.props.form.setFieldsValue({
      //   title: resp.title,
      //   author: resp.author,
      //   amount: resp.amount,
      //   createAt: moment(resp.createAt), // 设置时间要传moment对象
      // })

      /**
       * 上面这样传参数我们也可以缩写成下面这样
       */
      const {id, ...data} = resp; // 我们使用id的时候直接从路由里去取就可以了
      data.createAt = moment(resp.createAt);
      this.props.form.setFieldsValue(data) // 这里设置了content的时候 编辑器没有渲染 我们需要使用它的API

      // 渲染编辑器内容
      this.editor.txt.html(data.content)

    })
    .finally(() => {
      this.setState({
        spinStatus: false
      })
    })
  }
  /**在componentDidMount这个生命周期函数里初始化富文本编辑器 */
  componentDidMount() {
    this.initEditor(); // 初始化富文本编辑器

    // 获取数据
    this.getData();
  }
  render() {
    // console.log(this.props);
    /**
     * 我们发现每次在这个input输入框输入文字的时候都会重新渲染一遍组件
     */

    /**
     * 通过this.props.location.state.title可以去到传过来的参数title
     */

     // 测试打印一下这个wangeditor
    //  console.log(wangEditor);
    // console.log(this)
    const { getFieldDecorator } = this.props.form;// 我们加了上面这个高阶组件就可以 解构 得到this.props里的form了
    /**Form.Item布局 */
    const formItemLayout = {
      labelCol: { // 设置标签的col
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
      // 最外层添加Spin组件 ;使得产生保存过程中不能进行文章的更改
      <Spin
      spinning={this.state.spinStatus}
      tip={this.state.spinTip}
      >
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
            initialValue: "文章标题初始值", // 这里可以设置初值值
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

        
        {/* 发布时间字段 */}
        <Form.Item 
        label="发布时间" // 创建时间应该引用为系统的
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
            // <textarea 
            // placeholder="请输入文章内容"
            // style={{width: "100%", resize: "none", height: "500px", overflow: "auto", fontSize: "14px"}}
            // ></textarea>
            /**
             * 也不能使用textarea,因为我们可能需要传一些图片
             */
            // 我们这里需要使用一个富文本编辑器
            /**为了防止我们时间DatePicker不能选择 我们当前div设置一个样式;
             * 让他的z-index为0 最小
             */
            <div
            ref={this.editorRef}
            className="qf-editor"
            contentEditable={true} //不要只单纯的设置z-index为0;还要设置position为relative
            //zIndex: 0, position: "relative"; 也可以在外面设置一个edit.less, 然后再引入
            style={{width: "100%",minHeight: "300px", }} // 设置没minHeight就会自动增高了
            >

            </div>

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

      </Spin>

    )
  }
}


export default  Edit