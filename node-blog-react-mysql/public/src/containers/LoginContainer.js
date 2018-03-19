import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import * as Action from "@/redux/action"

import { Form ,Input, Button} from 'element-react'
import 'element-theme-default'
import axios from 'axios'


class LoginContainer extends React.Component{
    constructor(props,context) {
		super(props,context)
		this.handleSubmit=this.handleSubmit.bind(this)
		this.release=this.release.bind(this)
		this.onChange=this.onChange.bind(this)
		this.state={
			form:{
               name:'',
               password:''
			},
      rules:{
        name:[{ required: true, message: '请输入', trigger: 'blur' }],
        password:[{required: true, message: '请输入密码', trigger: 'blur' }]
      },
      minLength:6,
		}
	}
	handleSubmit(){
     let dispatch=this.props.dispatch;
     axios({
        method:"POST",
        url:'/user/login',
        data:this.state.form
      }).then((res)=>{
         console.log(res)
         if(res.data.state==200){
            dispatch(Action.GET_USER(res.data.username));
            console.log(res.data.username)
            this.props.history.push('/')
         }
      })
	}
	onChange(key, value) {
       this.setState({
             form: Object.assign(this.state.form, { [key]: value })
       });
    }
	release(){
      this.props.history.push('/reg')
	}
	componentWillMount(){
      //console.log(this.props.history)
    }
	render(){
		return(
			<div className='login'>
			   <p>用户登录</p>
			   <Form ref="formLogin" labelPosition="right" rules={this.state.rules} labelWidth="100" model={this.state.form} className="demo-form-stacked">
                    <Form.Item label="账户">
                       <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')} placeholder='请输入用户名'></Input>
                    </Form.Item>
                    <Form.Item label="密码">
                       <Input type="password" value={this.state.form.password} onChange={this.onChange.bind(this, 'password')} minLength={this.state.minLength} placeholder='请输入六位密码'></Input>
                    </Form.Item>
                   <Form.Item>
                     <Button type="primary" onClick={this.handleSubmit.bind(this)}>登录</Button>
                     <Button onClick={this.release.bind(this)}>注册</Button>
                   </Form.Item>
               </Form>
			</div>
		)
	}
}


const mapStateToProps=(state)=>{
   return{
     posts:state.posts
   }
 }

export default withRouter(connect(mapStateToProps)(LoginContainer))
