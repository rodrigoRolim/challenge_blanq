import App from './App.vue'
import Empresas from './components/empresas/EmpresaLista.vue'
import NovaEmpresa from './components/empresas/NovaEmpresa.vue'
import Pessoas from './components/pessoas/PessoasLista.vue'
import NovaPessoa from './components/pessoas/NovaPessoa.vue'
export default [
  { path: '/', redirect: '/company' },
  { path: '/company', component: Empresas},
  { path: '/new-company', component: NovaEmpresa },
  { path: '/people', component: Pessoas },
  { path: '/new-people', component: NovaPessoa}
]
