<template>
<div>
<div class="container">
  <div class="form-horizontal" >
  <fieldset>
    <legend>用户登入</legend>
    <div class="form-group">
      <p v-if="err">{{err}}</p>
      <label class="col-md-2 control-label" for="username">用户名</label>
      <div class="col-md-5">
        <input type="text" class="form-control"  name="username" v-model="username" >
      </div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label" for="password">口令</label>
      <div class="col-md-5">
        <input type="password" class="form-control" name="password-repeat" v-model="password">
      </div>
    </div>
    <div class="form-group">
      <label class="col-md-2 control-label" for="password-repeat">重复输入口令</label>
      <div class="col-md-5">
        <input type="password" class="form-control" name="password-repeat" v-model="passRepeat">
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-offset-2 col-md-10">
         <button  class="btn btn-primary" @click.stop="reg()">注册</button>
      </div>
    </div>
  </fieldset>
</div>
</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'reg',
  data () {
     return{
       username:"",
       password:"",
       passRepeat:"",
       err:""
     }
  },
  methods: {
     reg () {
       if(!(this.username && this.password && this.passRepeat)){
         this.err="请输入帐号和密码"
       }else if(this.password != this.passRepeat){
         this.err="密码与验证密码不一致"
       }else{
         var name=this.username,
             password=this.password;
         axios.post('http://localhost:8090/reg',{name:name,password:password})
              .then((res) => {
                if(res.data.state===1){
                  this.name='';this.password='';this.passRepeat='';
                  this.$store.dispatch('GET_USER',name).then(() => {
                    this.$store.dispatch('GET_POST')
                    this.$router.push('/')
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
}
</script>

<style>
/*.container{width:60%;height:100%;margin:0 auto;}
.container:after{content:"";clear:both;display:table;}
.form-horizontal form{margin:0 0 20px}
.control-group{margin-top:20px}
.control-group p{padding:0;margin:0;}
legend+.control-group{margin-bottom:20px}
.control-label{float:left;width:160px;padding-top:5px;text-align:right;
               display:block;margin-bottom:5px;font-size:14px;line-height:20px}
.controls{margin-left:180px;}
.form-horizontal input{display: inline-block;margin:0;vertical-align: middle;background-color:#fff;
                       border:1px solid #ccc;height:20px;padding:4px 6px;font-size:14px;line-height:20px;color:#555555}
.form-actions{margin:20px 0;border-top:1px solid #e5e5e5;padding:19px 20px 20px 180px}
.btn{display:inline-block;padding:4px 12px;font-size:14px;line-height:20px;text-align:center;vertical-align:middle;
     cursor:pointer;border-radius:4px;border:none}
.btn-primary{color:#fff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#006dcc;
             background-image:linear-gradient(to bottom, #0088cc, #0044cc)}
.form-horizontal p{padding:5px 0;margin:0;color:red;text-align: center;}*/
</style>
