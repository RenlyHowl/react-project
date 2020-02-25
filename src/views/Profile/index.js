import React, { Component } from 'react'
import {connect} from "react-redux"
import {changeAvatar} from "../../actions/user"
import axios from "axios"
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
        if (! this.updater.isMounted(this)) return null;
        this.setState({
          avatarUrl: resp.data.linkurl
        })
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
    console.log(this.props);
    return (
      <>
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
      
      </Card>

      </>
    )
  }
}

export default Profile