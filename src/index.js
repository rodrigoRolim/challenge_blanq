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
 } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue';

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdTable)
Vue.use(MdCard)
Vue.use(MdRipple)
Vue.use(MdToolbar)
//Vue.use(MdNumeric)
new Vue({
  el: '#app',
  render: h => h(App)
});