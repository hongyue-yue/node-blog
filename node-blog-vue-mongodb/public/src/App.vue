<template>
  <div id="app" >
    <div class="navbar navbar-default navbar-static-top">
      <div class="navbar-inner">
         <div class="container">
            <ul class="nav nav-pills col-md-8">
              <li><a class="brand">Blog</a></li>
              <li><router-link to="/" exact >首页</router-link></li>
              <li v-if="!user"><router-link to="/login" exact >登录</router-link></li>
              <li v-if="!user"><router-link to="/reg" exact >注册</router-link></li>
              <li><a @click.stop="out()"  v-if="user">登出</a></li>
            </ul>
         </div>
      </div>
    </div>

      <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutRight"
        mode="out-in"
        >
          <keep-alive>
            <router-view ></router-view>
          </keep-alive>
      </transition>
    
  </div>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    out(){
      axios.get('http://localhost:8090/logout')
           .then((res) => {
             if(res.data.state===1){
               this.$store.dispatch('GET_USER',res.data.username).then(() => {
                 this.$store.dispatch('GET_POST')
               })
             }else if(res.data.state===0){
                this.err=res.data.message
             }
           }).catch((err) => {
              console.log(err)
           })
    }
  },
}
</script>

<style>
a.router-link-active {color:#333333;}
span{float:right;display: inline-block;}
#app{width:100%;height:100%;position:relative;}
.view{position:absolute;top:40px;bottom:0;width:100%;}
  /*
  .header{height:40px;width:100%;background-color: #fafafa;box-shadow:0 1px 10px rgba(0, 0, 0, 0.1)}
  .inner{width:60%;margin:0 auto;height:100%;line-height:40px;}

  .inner>a {
    display: inline-block;
    vertical-align: middle;
    padding:0 10px;
    font-size: 16px;
    line-height: 40px;
    text-decoration:none;
    color:#777777;
    cursor: pointer;
  }
  .inner  a:hover,
  .inner  a:focus {
    text-decoration: none;
    outline: none;
  }
  .inner .brand{font-size:20px;font-weight:200;padding:0 20px}
  .inner>a.router-link-active {color:#333333;}
  .view{position:absolute;top:40px;bottom:0;width:100%;}
  .inner span{float:right;display: inline-block;}*/
</style>
