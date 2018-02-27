<template>
  <div class="speak">
    <p v-if="err">{{err}}</p>
    <input type="text" v-model="message">
    <button type="submit" class="btn btn-success" @click.stop="post()"><i class="icon-comment icon-white">
    </i> 发言</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
   name: 'speak',
   data () {
     return{
       message:"",
       err:""
     }
   },
   methods: {
      post () {
        var name=this.$store.state.user,
            post=this.message,
            time=new Date();
        axios.post("http://localhost:8090/post",{name:name,post:post,time:time})
             .then((res) => {
              if(res.data.state===1){
                this.$store.dispatch('GET_POST')
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
.speak{width:100%;padding:30px 50px;background-color:#eeeeee;margin:10px 0;text-align: center}
.speak input{width:50%;background-color:#fff;border:1px solid #ccc;padding:5px;box-sizing:border-box;}
.btn{display:inline-block;padding:4px 12px;font-size:14px;line-height:20px;text-align:center;vertical-align:middle;
     cursor:pointer;border-radius:4px;border:none}
.btn-success{color:#fff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#5bb75b;background-image:linear-gradient(to bottom, #62c462, #51a351)}
.speak p{padding:5px 0;margin:0;color:red;text-align: center;}
</style>
