// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
// import axios from 'axios'
// import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.css'

Vue.config.productionTip = false

// Vue.use(axios)
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
