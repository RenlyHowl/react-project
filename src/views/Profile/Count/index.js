/**
 * !immutable结合redux的demo
 * 
 */
import React, { Component } from 'react'
import {connect} from "react-redux"
import {
  Button,
} from "antd"
import {
  Map,
  List,
  fromJS
} from "immutable"
import {
  decreasement,
  increasement
} from "../../../actions/counter"

@connect(null, {decreasement, increasement})
class Count extends Component {
  onclick = () => {
    if(this.props.children === "+") {
      this.props.increasement()
    } else {
      this.props.decreasement()
    }
  }
  render() {
    return (
      <div>
        <Button onClick={this.onclick}>{this.props.children}</Button>
      </div>
      
    )
  }
}
export default Count