import Vue from 'vue';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import routes from  './routes'
import history from 'vue-history-api-fallback'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from  './store/index'
import App from './App.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)
const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
});