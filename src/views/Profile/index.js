import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeAvatar} from "../../actions/user"
import axios from "axios"
// counter相关的组件
import Count from "./Count"
import CounterDisplay from "./CounterDisplay"


// 导入lodash作为深复制和浅复制使用
// import _ from "lodash"
// 导入immutable中的map
// import {
//   Map,
//   List,
//   fromJS
// } from "immutable"
import {
  Upload,
  Card,
  Button,
  Icon,
  Spin
} from "antd"
import "./index.less"
// 导入我们的改变头像的action
const mapState = state => (
  {
    avatarUrl: state.user.avatar
  }
)

@connect(mapState, {changeAvatar})
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      avatarUrl: "" , //管理上传图片的地址
      isUploading: false, //上传状态
    }
  }
  // 自定义上传实现
  /**
   * 自定义了上传实现就会阻止我们默认的上传行为,浏览器就不会再报错了
   */
  handleupAvatar = ({file}) => {
    // console.log("上传了"); // 测试是否上传了
    /**
     * 通过打印自定义上传行为的函数里面发现他自带一些参数;
     * 将参数里的file上传数据的信息解构出来
     */
    console.log(file); 
    /**
     * 创建表单数据进行发送
     */
    const data = new FormData();
    data.append("Token","7617d9c5fb9c74e02dd2be197a881021d04b0bc5:eTVMwzfX39G2jB-W6iPD-tZMEAs=:eyJkZWFkbGluZSI6MTU4MjYwNDY3MSwiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzEwNTY1IiwiYWlkIjoiMTY2NTU3MSIsImZyb20iOiJmaWxlIn0=")
    data.append("file",file);
    this.setState({
      isUploading: true
    })
    // 上传图片到贴图库
    axios.post("http://up.imgapi.com/", data)
    .then((resp) => {
      // console.log(resp);
      if(resp.status === 200) {
        // 返回成功
        // if (! this.updater.isMounted(this)) return null;
        // this.setState({
        //   avatarUrl: resp.data.linkurl
        // })
        /**
         * 这里使用的是action,而不是使用state
         */
        this.props.changeAvatar(resp.data.linkurl)
      } else {
        // 自行处理错误
      }
      
    })
    .catch((err) => {
      // 自行处理错误
    })
    .finally(() => {
      if (! this.updater.isMounted(this)) return null;
      this.setState({
        isUploading: false
      })
    })
  }

  render() {
    // console.log(this.props);
    // window._ = _; // 将lodash挂载到window对象上
    // 1.immutable之Map 对象

    // const state = {
    //   name: "qf",
    //   courses: ["h5", "java", "python"]
    // }
    // const imstate = Map(state)
    // /**
    //  * 分别打印state和imstate的值发现这两个值的结果不一样,
    //  * 第一个是原生的js对象,第二个是immutable对象;
    //  * 我们同时通过.name去取他的值,imstate是取不到的;因为immutable对象的数据结构和原来的js对象不一样了,发生了改变;
    //  * 要想去取他对应的值就使用这个对象上的get方法(state.name; imstate.get("name"));
    //  * 
    //  */
    // console.log(state)
    // console.log(imstate)
    // /**改变值就用set方法,set方法返回的是一个新的immutable对象;
    //  * 注意immutable数据每次更改的时候都会返回一个新的immutable对象;这就说明immutable.js能够保证上一次状态是可用的;
    //  * 他每次都会返回一个新的拷贝,而且这个拷贝不是完全的;只是给更改的数据新开辟了一个内存,而没有更改的数据还是在原来的内存地址上;
    //  * 只是改了的数据会开辟一个新的内存
    //  */
    // console.log(state.name)
    // const imstate1 = imstate.set("name", "qf-im")
    // console.log(imstate1.get("name"))

    // 2.immutable之List 数组
    // const list1 = List([1,2]);
    // const list2 = list1.push(3,4,5);
    // console.log(list1.get(4)) // 输出 undefined
    // console.log(list2.get(4)) // 输出 5


    // 3.1复杂数据结构 fromJs方法
    // const state = {
    //   name: "qf",
    //   courses: ["h5", "java", "python"]
    // }
    // const imstate = fromJS(state);
    // console.log(imstate)
    // /**
    //  * 如果我们想要去取数组里的值
    //  */
    // console.log(imstate.get("courses").get(1)) // "java"
    // // 上面可以简写成下面的
    // console.log(imstate.getIn(["courses", 1])) // java
    
    // 3.2 fromJs
    // const state = {
    //   name: "qf",
    //   obj: {
    //     x: 1,
    //     y: {
    //       z:2,
    //     }
    //   },
    //   courses: ["h5", "java", "python"]
    // }
    // const imstate = fromJS(state);
    // console.log(imstate)
    // // console.log(imstate)
    // // 取state下面的obj下面的y下面的z
    // /**
    //  * getIn方法里面的数组分层取我们的数据
    //  */
    // console.log(imstate.getIn(["obj", "y", "z"]))

    // /**
    //  * 使用setIn方法设置z的值
    //  */
    // // const newimstate = imstate.setIn(["obj", "y", "z"], 100);
    // /**
    //  * 我们也可以采用updateIn来设置复杂数据结构的值
    //  */
    // const newimstate = imstate.updateIn(["obj", "y", "z"], value => value + 2); // 当当前值加2,也就是在原来值的基础上加2
    // console.log(newimstate.getIn(["obj", "y", "z"]))


    return (
      <Card
      title="个人设置页面"
      bordered={false} // 取消边框
      >
      <Upload
      // style={{ border: "1px dashed #dedede", width: "128px", height: "128px", display: "block"}}
      className="qf-avatar"
      listType="picture"
      showUploadList={false}
      customRequest={this.handleupAvatar} //自定义上传实现
      > 
      {/* 条件渲染我们上传的照片 */}
      <Spin 
      spinning={this.state.isUploading}
      >
      {
        this.props.avatarUrl ? <img src={this.props.avatarUrl} alt="头像" style={{width: "80px", height: "80px"}} /> : <Button>
        <Icon type="upload" /> 点击上传
      </Button>
      }
      </Spin>

      </Upload>
      
      <Count>+</Count>
      <CounterDisplay>10</CounterDisplay>
      <Count>-</Count>
      </Card>
    )
  }
}

export default Profile