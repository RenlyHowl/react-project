import React, { Component } from 'react'

import {connect} from "react-redux"

const mapstate = state => ({
  count: state.counter.count
})
@connect(mapstate)
class CounterDisplay extends Component {
  render() {
    return (
      <div>
        {this.props.count}
      </div>
    )
  }
}


export default CounterDisplay