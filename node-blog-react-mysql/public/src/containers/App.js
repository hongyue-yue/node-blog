import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Route,NavLink,Link,withRouter,Switch} from 'react-router-dom'

import * as Action from "@/redux/action"

import { Menu } from 'element-react'
import 'element-theme-default'


class App extends React.Component{
   constructor(props,context) {
      super(props,context)

   }
   componentWillMount(){
  }
   render(){
      const user=this.props.user;
      const menu=()=>{
          if(user){
              return (
                 <Menu defaultActive="/" mode="horizontal" className='menu-dome'>
                   <Menu.Item index="">blog</Menu.Item>
                   <Menu.Item index="/"><Link to='/'>首页</Link></Menu.Item>
                 </Menu>
              )
          }else{
              return(
                <Menu defaultActive={this.props.history.location.pathname} mode="horizontal" className='menu-dome' >
                   <Menu.Item index="">blog</Menu.Item>
                   <Menu.Item index="/"><Link to='/'>首页</Link></Menu.Item>
                   <Menu.Item index="/login"><Link to='/login'>登录</Link></Menu.Item>
                   <Menu.Item index="/reg"><Link to='/reg'>注册</Link></Menu.Item>
                </Menu>
              )
          }
      }
      return(
              <div className='main'>
                <div className='menu'>
                    {menu()}
                </div>
                <div className='body'>
                  {this.props.children}
                </div>
              </div>
            )
   }
}
const mapStateToProps=(state)=>{
   return{
     user:state.user
   }
}

export default withRouter(connect(mapStateToProps)(App))
