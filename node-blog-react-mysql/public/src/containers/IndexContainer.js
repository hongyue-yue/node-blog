import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

import * as Action from "@/redux/action"
import Login from "@/components/loginCom"
import Release from "@/components/releaseCom"
import LiItems from "@/components/liItems"


class IndexContainer extends React.Component{
    constructor(props,context) {
		super(props,context)
    this.release=this.release.bind(this)
    this.getPostName=this.getPostName.bind(this)
    this.getPost=this.getPost.bind(this)
		this.state = { show: false }
	}
  release(value){
    axios({
       method:'post',
       url:'/api/post',
       data:{
         user:this.props.user,
         post:value,
       }
    }).then((res)=>{
       if(res.data.state==200){
         if(this.props.user){
              this.getPostName();
         }else{
              this.getPost();
         }
       }
    })
  }
  getPostName(){
    let dispatch=this.props.dispatch;
    axios.get(`/api/post?name=${this.props.user}`).then((res)=>{
               dispatch(Action.GET_POSTS(res.data.posts));
          })
  }
  getPost(){
    let dispatch=this.props.dispatch;
    axios.get('/api/post').then((res)=>{
               dispatch(Action.GET_POSTS(res.data.posts));
          })
  }
	componentWillMount(){
		 let user=this.props.user;
		 if(user){
          this.getPostName();
		 }else{
          this.getPost();
		 }

  }
	render(){
		const user=this.props.user
		const posts=this.props.posts
		const index=()=>{
			if(user){
				 return <Release release={this.release.bind(this)}/>
			}else{
				 return <Login/>
			}
		}
		const postsList=posts.map((item,index)=> {
           return (
              <LiItems key={index} item={item}></LiItems>
           )
       })
		return(
		    <div>
			   <div className="indexCom">
			       {index()}
			   </div>
			   <ul className="postsCom">
                 {postsList}
			   </ul>
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
   return{
   	 user:state.user,
     posts:state.posts
   }
 }


export default withRouter(connect(mapStateToProps)(IndexContainer))
