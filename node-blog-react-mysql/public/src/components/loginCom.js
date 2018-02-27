import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'element-react'
import 'element-theme-default'

export default class LoginCom extends React.Component{
    constructor(props,context) {
		super(props,context)
	}
	render(){
		return(
			 <div>
			    <h1>欢迎来到Blog</h1>
			    <p>这是一个基于node-react-express-mysql的微博系统</p>
			    <Button type="primary"><Link to='/login'>登录</Link></Button>
                <Button ><Link to='/reg'>注册</Link></Button>
             </div>
			)
	}
}

