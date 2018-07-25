import Vue from 'vue';

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from 'vue-router'
import routes from  './routes'
import EmpresaLista from './components/empresas/EmpresaLista.vue'
import history from 'vue-history-api-fallback'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});