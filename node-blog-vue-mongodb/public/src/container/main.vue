<template>
  <div>
  <div class="container">
    <welcome v-if="!user"></welcome>
    <speak v-else></speak>
    <post :post="post" v-for="(post, index) in posts" :key="index"></post>
  </div>
  </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'
import store from '../store'
import welcome from '../components/welcome.vue'
import post from '../components/post.vue'
import speak from '../components/speak.vue'
import axios from 'axios'
export default {
  name: 'main',
  computed: {
     ...mapState({
        user: state => state.user,
        posts: state => state.posts
     })
  },
  beforeMount () {
     if(this.posts.length==0){
        store.dispatch('GET_POST')
     }
  },
  components: {
    welcome,
    post,
    speak
  },
  methods: {
  },
  /*activated () {
     console.log("activated")
     store.dispatch('GET_POST')
  },
  watch:{
     user:function(){
       store.dispatch('GET_POST')
     }
  }*/
}
</script>

<style>
.container{width:60%;height:100%;margin:0 auto;}
.container:after{content:"";clear:both;display:table;}
</style>
