import App from './App.vue'
import Empresas from './components/empresas/EmpresaLista.vue'
import NovaEmpresa from './components/empresas/NovaEmpresa.vue'

export default [
  { path: '/', component: Empresas },
  { path: '/new-business', component: NovaEmpresa }
]
