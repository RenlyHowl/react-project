import React, { Component, createRef} from 'react'

import {
  Card,
  Row,
  Col,
  Typography
} from "antd"

// 引入echarts
import echarts from "echarts"
// 导入样式文件
import "./dashBorder.less"

// 导入获取文章阅读量的请求方法
import {
  getArticleAmount
} from "../../request/Frame"




export default class DashBoard extends Component {
  constructor() {
    super();
    this.echartRef = createRef();
    this.state = {
      option: null
    }
  }

  // 取文章阅读量的方法
  getAmount = () => {
    getArticleAmount()
    .then((resp) => {
      // console.log(resp);
      /**设置数据配置结构 */
      const monthMaps = resp.amount.map(item => {
        return item.month
      })
      const valueMaps = resp.amount.map(item => {
        return item.value
      })
      // console.log({monthMaps, valueMaps})
      const option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            data: monthMaps
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            // data: [5, 20, 36, 10, 10, 20]
            data: valueMaps
        }]
      };
      if (! this.updater.isMounted(this)) return null;
      this.setState({
        option: option
      });
      // 渲染图表
      this.myChart.setOption(this.state.option);
    })
  }
  // 初始化echarts的方法
  echartInit = () => {
    /**
     * 注意DOM元素要给height高度
     */
    this.myChart = echarts.init(this.echartRef.current); // 这里需要传一个DOM, .current才是DOM
    // 取文章数据
    this.getAmount();
  }

  componentDidMount() {
    this.echartInit();
  }
  render() {
    // console.log(echarts) // 测试echarts是否有了
    /**
     * 初始化init方法的第一个参数是DOM,所以我们使用createRef方法创建ref
     */
    return (
      <>
      {/* 这个是咱们的概览部分 */}
      <Card
      title={"概览"}
      >
      <Row gutter={16}>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor: "#66BB6A"}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor: "#2196F3"}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor: "#AFB42B"}}>col-6</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className="qf-gutter-box" style={{backgroundColor: "#FF7043"}}>col-6</div>
      </Col>
    </Row>
      </Card>
      

      {/* 图表部分 */}
      <Card
      title={<Typography.Text strong>最近浏览量</Typography.Text>} //这里需要用到我们的图表
      >
      <div
      ref={this.echartRef}
      style={{
      // width: "600px",
      height: "400px"
    }}
      >
      </div>

      </Card>

      </>
      
    )
  }
}
