import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
// Vue.use(axios)
const store = new Vuex.Store({
  state: {
    user: '',
    posts: []
  },
  mutations: {
    SET_USER (state, data) {
      state.user = data
    },
    SET_POST (state, data) {
      state.posts = data
    }
  },
  actions: {
    GET_POST ({ commit, state }) {
      return axios.get('http://localhost:8090/post', {params: {name: state.user}})
                  .then(function (res) {
                    if (res.data.state === 1) {
                      commit('SET_POST', res.data.posts)
                    } else if (res.data.state === 0) {
                      console.log(res.data.message)
                    }
                  }).catch(function (err) {
                    console.log(err)
                  })
    },
    GET_USER ({ commit, state }, data) {
      commit('SET_USER', data)
    }
  }
})

export default store
