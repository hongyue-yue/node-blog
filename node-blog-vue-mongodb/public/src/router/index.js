import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/container/main'
import Login from '@/container/login'
import Reg from '@/container/reg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/reg',
      component: Reg
    }
  ]
})
