import App from './App.vue'
import Companies from './components/empresas/CompanyList.vue'
import NewCompany from './components/empresas/NewCompany.vue'
import People from './components/pessoas/PessoasLista.vue'
import NewPeople from './components/pessoas/NewPeople.vue'
import CompanyDetail from './components/empresas/CompanyDetails.vue'

export default [
  { path: '/', redirect: '/company' },
  { path: '/company', name: 'company',  component: Companies },
  { path: '/new-company', name: 'newcompany', component: NewCompany },
  { path: '/people', name: 'people', component: People },
  { path: '/new-people', name: 'newpeople', component: NewPeople },
  { path: '/company/:id', name: 'companydetail', component: CompanyDetail },
  { path: '*', component: Companies}
]
