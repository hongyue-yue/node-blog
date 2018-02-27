<template>
  <div class="wel">
   <h1>欢迎来到Blog</h1>
   <p>这是一个基于 Node.js 的微博系统。</p>
   <button type="button" class="btn btn-primary btn-lg" @click="routGo('/login')">登录</button>
   <button type="button" class="btn btn-lg" @click="routGo('/reg')">注册</button>

  </div>
</template>
<script>
export default {
  name: 'welcome',
  methods: {
    routGo (url) {
      //window.location="http://localhost:8080/#"+url;
      this.$router.push(url)
    }
  }
}
</script>

<style>
.wel{width:100%;padding:30px 50px;background-color:#eeeeee;margin:10px 0;}
/*h1{font-size:50px;margin:10px 0;padding:0;}
p{font-size:14px;margin:10px 0;padding:0;}
.btn{display:inline-block;padding:4px 12px;font-size:14px;line-height:20px;text-align:center;vertical-align:middle;
     cursor:pointer;border-radius:4px;border:none}
.btn-primary{color:#fff;text-shadow:0 -1px 0 rgba(0, 0, 0, 0.25);background-color:#006dcc;
             background-image:linear-gradient(to bottom, #0088cc, #0044cc)}*/
</style>
