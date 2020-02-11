import React, { Component } from 'react'

// 导入moment
import moment from "moment"

// 导入Card组件
import {
  Card,
  Button,
  Table,
  Tag
} from "antd"

// 导入我们axios请求实例
/*请求文章数据 的接口 */
import {getArticleList} from "../../request/Frame"

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
    //     {
    //       key: '1',
    //       name: '胡彦斌',
    //       age: 32,
    //       address: '西湖区湖底公园1号',
    //     },
    //     {
    //       key: '2',
    //       name: '胡彦祖',
    //       age: 42,
    //       address: '西湖区湖底公园1号',
    //     },
    //   ],
    // columns: [
    //   {
    //     title: '姓名',
    //     dataIndex: 'name',
    //     key: 'name',
    //   },
    //   {
    //     title: '年龄',
    //     dataIndex: 'age',
    //     key: 'age',
    //   },
    //   {
    //     title: '住址',
    //     dataIndex: 'address',
    //     key: 'address',
    //   },
    //   { //新加一个操作的功能
    //     title: '操作',
    //     dataIndex: 'actions',
    //     key: 'actions',
    //     render: (text, record, index) => {
    //       // console.log(text, record, index);
    //       return (
    //       <span>
    //       <a href="javascript;">delete{record.name}</a>
    //       </span>
    //       )
    //     }
    //   }
    ],
    total: 2 // 数据的总条数
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

  getData = () => {
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
              // console.log(text)
              // console.log(record)
              // console.log(index)
              /**
               * 使用Tag标签 组件来渲染
               */

              /*
              if(record.amount <= 200) {
                return <Tag color="orange">{record.amount}</Tag>
              } else {
                return <Tag color="purple">{record.amount}</Tag>
              }
              */

            const {amount} = record;
            // return amount >= 200 ? <Tag color="red">{record.amount}</Tag> : <Tag color="blue">{record.amount}</Tag>
            /**
             * 这里是根据数字进行条件渲染
             * 我们也可以根据职位级别来进行条件渲染,只不过需要用到TypeMap来做
             * 比如总经理: "001"; 经理: "002" ; 主管: "003"
             */
            /*
             const titleMap = {
              "001": "blue",
              "002": "red",
              "003": "green"
            }
            */
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
      
      this.setState({
        // columns: resp.lists,
        total: resp.total,
        columns,
        dataSource: resp.lists
      })

    })
    .catch((err) => {
      console.log(err)
    })
  }
  // 请求数据
  componentDidMount(){
    this.getData();
  }
}
