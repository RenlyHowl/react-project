import React, { Component } from 'react'

// 导入moment
import moment from "moment"

// 导入xlsx用于导出EXcel
import XLSX from "xlsx"


// 导入Card组件
import {
  Card,
  Button,
  Table,
  Tag,
  Modal, // 弹框
  Typography, //排版组件
  message, // 全局提示组件
  Tooltip, // 文字提示组件
} from "antd"

// 导入我们axios请求实例
/*请求文章数据 的接口 */
import {
  getArticleList,
  deleteArticle
} 
from "../../request/Frame"
// import ButtonGroup from 'antd/lib/button/button-group'
const ButtonGroup = Button.Group
const {Text} = Typography;
// 进行调试 挂载到window对象上去
// window.moment = moment


/**
 * 创建一个创建标题的方法
 */
const titleDisplayMap = {
  id: "id",
  title: "标题",
  author: "作者",
  amount: "浏览数量",
  createAt: "创建时间"
}

// let offset = 0; // 保存当前的数据offset
export default class List extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [

    ],
    total: 2, // 数据的总条数

    /**定义数据加载是否完成的状态 */
    isLoading: false, // 默认为false
    /**
     * 定义当前页数和每一页的数据
     */
    offset: 0,
    limited: 10,
    /**
     * 控制模态框的显示
     */
    visible: false,
    delArticleContent: null, // 显示的content内容
    delArticleId: null, //显示的id
    confirmLoading: false // 点击确定是否显示loading状态
    }
  }
  
  render() {
    return (
      <div>
        <Card title="文章列表"
         bordered={false} 
         style={{ width: "100%" }}
         extra={<Button type="primary" onClick= {this.toExcel}>导出excel</Button>}
         >
        
        <Table 
        rowKey= {(record) => {return record.id}}
        dataSource={this.state.dataSource} 
        columns={this.state.columns} 
        isLoading={this.state.isLoading}
        pagination={{
          // total:100, // 总的数据为100条 默认每页10条
          total: this.state.total,
          defaultPageSize: this.state.limited,
          // simple: true,
          showQuickJumper: true, // 开启可以快速跳转页码
          showSizeChanger: true, // 开启可以更改pageSize
          onChange: this.onChange,
          pageSizeOptions: ['10', '20', '30', '50'], // 设置更改显示每页数据的
          onShowSizeChange: this.onShowSizeChange, // 我们这里是mock数据返回的只有10条
          current: this.state.offset / this.state.limited + 1 // 设置了current属性才能在设置完pageSize之后够进行跳转到首页
        }}
        />
        <Modal
        title = {<Text strong>此操作不可逆,请谨慎!!!</Text>}
        visible={this.state.visible}
        onOk={this.handleOk.bind(this, this.state.delArticleId)}
        onCancel={() => {
          this.setState({
            visible: false
          })
        }}
        confirmLoading={this.state.confirmLoading}
        okButtonProps={{ disabled: false }}
        cancelButtonProps={{ disabled: false }}
        >
          {/**我们这里要显示的record的是变量 我们可以用一个content变量来保存;
           *当我们点击的时候将变量传过去即可  */ }
          {this.state.delArticleContent}
        </Modal>

        </Card>
      </div>
    )
  }

  // 处理弹框确定的函数
  handleOk = (id) => {
    // console.log(id); // 测试可以获取到id
    this.setState({
      confirmLoading: true // 加载loading
    })
    deleteArticle(id)
      .then((resp) => {
        console.log(resp);
        /**
         * 删除成功后关闭弹框 关闭loading
         * 最好放到finally里面去处理
         */
        // this.setState({
        //   visible: false,
        //   confirmLoading: false
        // })

        // 提示删除成功 删除信息为我们后端返回的信息
        message.success("请求成功", 0.1);

        // 删除成功后再去取数据
        /**
         * 我们这里删除之后还是留在了当前页还是想回到首页
         */
        this.getData();// 留在当前页 直接请求数据

        // 回到首页
        /**
         * 更改offset
         */
        // this.setState({
        //   offset: 0
        // });
        // this.getData();

        /**
         * 直接写成回调函数的形式
         */
        this.setState({
          offset: 0
        }, () => {
          this.getData();
        })
        
      })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      /**
         * 删除成功后关闭弹框 关闭loading
         */
    this.setState({
      visible: false,
      confirmLoading: false
    })

    })
  }

  // 导出excel的方法
  toExcel = () => {
    // console.log("toExcel")
    /**
     * 在实际的项目中是前端发送一个ajax请求给后端;然后后端返回一个文件下载的地址
     */

    /* convert state to workbook */
    // const ws = XLSX.utils.aoa_to_sheet(this.state.data);  // 这里的this.state.data是二维数组
    // const ws = XLSX.utils.aoa_to_sheet([["a","b"],[1,2],[3,4]]); // 测试看是否能够输出一个excel文件

    /**
     * 组合数据1
     */
    // const columns = Object.values(titleDisplayMap);
    // const data = this.state.dataSource.map((item) => {
    //   for (var key in item) {
    //     if (key === "createAt") {
    //       item[key] = moment(item[key]).format("YYYY年MM月DD日 hh:mm:ss")
    //     }
    //   }
    //   return (
    //     Object.values(item)
    //   )
    // })
    // data.unshift(columns);
    // console.log(data)


    /**
     * 组合数据2
     */
    const data = [Object.keys(this.state.dataSource[0])]; // 注意我们的keys是无序的
    for (var i = 0; i < this.state.dataSource.length; i++) {
      // data.push(Object.values(this.state.dataSource[i]));

      // 对于显示顺序 我们可以在插入push的时候 自定义
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format("YYYY年MM月DD日 hh:mm:ss"), // 修改时间的显示格式
        
      ])
    }
    console.log(data)


    // 导出excel文件
    const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		/* generate XLSX file and send to client */
		XLSX.writeFile(wb, "sheetjs.xlsx"); // C:/Users/Renly/Desktop/sheetjs.xlsx 测试了不能够直接加路径
  }


  onChange = (page, pageSize) => {
    // console.log(page); // 当前页数
    // console.log(pageSize) // 每一页显示的数据条数
    // offset = (page - 1) * pageSize;
    this.setState({
      offset: (page - 1) * pageSize,
      limited: pageSize
    }, () => {
      this.getData(); // 更改完之后再去请求数据(在他的回调函数里面)
    })
  }
  onShowSizeChange = (current, size) => {
    // 更改了pageSize之后 又得重新计算当前的page
    // console.log(current);
    // console.log(size) 显示当前的pageSize

    /**重新发起请求 */
    this.setState({
      // offset: offset,
      offset: 0, // 更改完之后 直接跳转到首页 但是我们发现没有跳转到首页 这是因为我们需要加上一个current的属性
      limited: size
    }, () => {
      this.getData(); // 更改完之后再去请求数据(在他的回调函数里面)
    })
  }



  // 创建columns的函数
  createColumns = (columnsKeys) => {
    const columns = columnsKeys.map((item) => {
      /**
       * 使用render函数进行渲染
       */
      if (item === "amount") {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
          const {amount} = record;
          return (
            <Tooltip placement="topLeft" title={amount >= 200 ?"超过200" : "小于200"} arrowPointAtCenter={true}>
            <Tag color={amount >= 200 ?"red" : "blue"}>{record.amount}</Tag>
          </Tooltip>
          )
          }
        }
      }
      if (item === "createAt") {
        return {
          title: titleDisplayMap[item],
          dataIndex: item,
          key: item,
          render: (text, record, index) => {
            return moment(record.createAt).format("YYYY年MM月DD日 hh:mm:ss")
          }
        }
      }
      return {
        title: titleDisplayMap[item],
        dataIndex: item,
        key: item,
      }
    })
    // 添加一个操作的columns
    columns.push({
      title: "操作",
      dataIndex: "操作", // 其实上面的dataIndex也可以不用写
      key: "action",
      render: (text, record, index) => {
      return <ButtonGroup size="small">
        <Button type="primary">编辑</Button>
        <Button type="danger" onClick={this.delArticle.bind(this, record)}>删除</Button> 
      </ButtonGroup>
      }
  })

    return columns;
  }

  // 删除文章的方法
  delArticle = (record) => {
    // 一、采用Modal函数的形式
    // console.log(id); // 通过bind将我们的id给获取到
    // 1. 上面就是点击按钮操作的实现
    // 2. 弹出对话框
    /**我们这里没有采用组件的形式;(return Modal的组件形式没有作用)
     * 而是采用的全局的Modal的函数的形式
     */
    // Modal.confirm({
    //   // 使用Typography排版组件
    //   // title: `确定要删除${record.title}吗?`,
    //   content: <>确定要删除<Text type="danger">{record.title}</Text>吗?</>, // 这就说明 我们这里可以使用标签 组件的形式
    //   title: <Text strong>此操作不可逆,请谨慎!!!</Text>,
    //   okText: "别墨迹,感觉删！",
    //   cancelText: "残忍拒绝",
    //   onOk: () => {
    //     // 点击确定的回调

    //     // 发送删除文章的请求
    //     deleteArticle(record.id)
    //     .then((resp) => {
    //       console.log(resp);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })

    //   },
    //   onCancel: () => {
    //     //取消后的回调
    //     /**
    //      * 点击 取消弹框消失 这部分已经有了
    //      */
    //   }
    // })
    

    // 二、采用Modal组件的形式
    // 我们需要在render函数中渲染他
    // 2.1弹出对话框
    this.setState({
      visible: true,
      delArticleContent: <Typography>确定要删除<Text type="danger">{record.title}</Text>吗?</Typography>,
      delArticleId: record.id
    });
  }

  // 请求数据的方法
  getData = () => {
    this.setState({
      isLoading: true
    })

    getArticleList(this.state.offset, this.state.limited)
    .then((resp) => {
      

      // 测试看能不能请求到数据
      // console.log(resp);
      /*进行数据的渲染 */
      // 取出key值
      const columnsKeys = Object.keys(resp.lists[0])
      // console.log(columnsKeys)
      /**
       * 打印出来key值是一个数组
       * (5) ["id", "title", "author", "amount", "createAt"]
       */
      const columns = this.createColumns(columnsKeys);

      this.setState({
        // columns: resp.lists,
        total: resp.total,
        columns,
        dataSource: resp.lists,
      })

    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }
  // 请求数据
  componentDidMount(){
    this.getData();
  }
}
