<template>
  <div>
  <div class="container">
  <form class="form-horizontal" >
	<fieldset>
		<legend>用户登入</legend>
    <p v-if="err">{{err}}</p>
		<div class="form-group">
			<label class="col-md-2 control-label" for="username">用户名</label>
			<div class="col-md-5">
				<input type="text" class="form-control"  name="username" v-model="username" placeholder="用户名">
			</div>
		</div>
		<div class="form-group">
			<label class="col-md-2 control-label" for="password">口令</label>
			<div class="col-md-5">
				<input type="password" class="form-control" name="password" v-model="password">
			</div>
		</div>
		<div class="form-group">
      <div class="col-md-offset-2 col-md-10">
        <button  class="btn btn-primary" @click.stop="login()">登入</button>
      </div>
		</div>
	</fieldset>
  </form>
 </div>
 </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
     return{
       username:"",
       password:"",
       err:""
     }
  },
  methods:{
    login () {
      axios.post('http://localhost:8090/login',{name:this.username,password:this.password})
           .then((res) => {
              if(res.data.state===1){
                this.username='';this.password='';
                 this.$store.dispatch('GET_USER',res.data.username).then(() => {
                   this.$store.dispatch('GET_POST')
                   this.$router.push('/')
                 })
              }else if(res.data.state===0){
                 this.err=res.data.message
              }
            }).catch((err) => {
               console.log(err)
        })
      },
  },
}
</script>

<style>
/*.container{width:60%;height:100%;margin:0 auto;}
.container:after{content:"";clear:both;display:table;}
.form-horizontal form{margin:0 0 20px}
.control-group{margin-top:20px}
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
