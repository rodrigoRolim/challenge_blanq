import App from './App.vue'
import Empresas from './components/empresas/EmpresaLista.vue'
import NovaEmpresa from './components/empresas/NovaEmpresa.vue'
import Persons from './components/pessoas/PessoasLista.vue'
export default [
  { path: '/', redirect: '/business' },
  { path: '/business', component: Empresas},
  { path: '/new-business', component: NovaEmpresa },
  { path: '/persons', component: Persons}
]
