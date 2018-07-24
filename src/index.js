import Vue from 'vue';
import { 
  MdButton,
  MdContent,
  MdTabs,
  MdTable,
  MdRipple,
  MdCard,
  MdNumeric,
  MdToolbar,
  MdIcon,
 } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import VueRouter from 'vue-router'
import routes from  './routes'
import EmpresaLista from './components/empresas/EmpresaLista.vue'
import App from './App.vue'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdTable)
Vue.use(MdCard)
Vue.use(MdRipple)
Vue.use(MdToolbar)
Vue.use(MdIcon)

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
new Vue({
  router,
  el: '#app',
  render: h => h(App)
});