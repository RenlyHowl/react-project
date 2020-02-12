import React, { Component } from 'react'

// 导入moment
import moment from "moment"

// 导入Card组件
import {
  Card,
  Button,
  Table,
  Tag,

} from "antd"

// 导入我们axios请求实例
/*请求文章数据 的接口 */
import {getArticleList} from "../../request/Frame"
// import ButtonGroup from 'antd/lib/button/button-group'
const ButtonGroup = Button.Group

// 进行调试 挂载到window对象上去
// window.moment = moment

/*
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  { //新加一个操作的功能
    title: '操作',
    dataIndex: 'actions',
    key: 'actions',
    render: (text, record, index) => {
      // console.log(text, record, index);
      return (
      <span>
      <a href="javascript;">delete{record.name}</a>
      </span>
      )
    }
  },
];

*/


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

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [

    ],
    total: 2, // 数据的总条数

    /**定义数据加载是否完成的状态 */
    isLoading: false, // 默认为false

    }
  }
  
  render() {
    return (
      <div>
        <Card title="文章列表"
         bordered={false} 
         style={{ width: "100%" }}
         extra={<Button type="primary">导出excel</Button>}
         >
        
        <Table 
        rowKey= {(record) => {return record.id}}
        dataSource={this.state.dataSource} 
        columns={this.state.columns} 
        isLoading={this.state.isLoading}
        pagination={{
          // total:100, // 总的数据为100条 默认每页10条
          total: this.state.total,
          defaultPageSize: 20,
          simple: true,
        }}
        />

        </Card>
      </div>
    )
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
          return <Tag color={amount >= 200 ?"red" : "blue"}>{record.amount}</Tag>
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
        <Button type="danger">删除</Button>
      </ButtonGroup>
      }
  })

    return columns;
  }

  getData = () => {
    this.setState({
      isLoading: true
    })

    getArticleList()
    .then((resp) => {
      

      // 测试看能不能请求到数据
      console.log(resp);
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
