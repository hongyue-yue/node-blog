import React from 'react'
import { Button ,Input} from 'element-react'
import 'element-theme-default'
import axios from 'axios'


export default class ReleaseCom extends React.Component{
    constructor(props,context) {
		   super(props,context)
		   this.state = {value: ''};
		   this.onChange = this.onChange.bind(this);
       this.release = this.release.bind(this);
	  }
   onChange(value) {
       this.setState({
             value: value
       });
    }
  release(){
    this.props.release(this.state.value)
  }
	render(){
		return(
			  <div className='release'>
			     <p>请输入留言</p>
			     <div>
			        <Input  value={this.state.value}  placeholder="请输入内容" onChange={this.onChange.bind(this)}/>
			        <Button type="success" onClick={this.release.bind(this)}>发布</Button>
			     </div>
			  </div>
			)
	}
}
