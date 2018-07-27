import App from './App.vue'
import Companies from './components/empresas/CompanyList.vue'
import NewCompany from './components/empresas/NewCompany.vue'
import People from './components/pessoas/PeopleList.vue'
import NewPeople from './components/pessoas/NewPeople.vue'
import CompanyDetail from './components/empresas/CompanyDetails.vue'
import PeopleDetail from './components/pessoas/PeopleDetail.vue'
import NotFoundComponent from './components/NotFoundComponent.vue'

export default [
  { path: '/', redirect: '/companies' },
  { path: '/companies', name: 'company',  component: Companies },
  { path: '/new-company', name: 'newcompany', component: NewCompany },
  { path: '/peoples', name: 'people', component: People },
  { path: '/new-people', name: 'newpeople', component: NewPeople },
  { path: '/new-people/:id', name: 'updatepeople', component: NewPeople },
  { path: '/people/:id', name: 'peopledetail', component: PeopleDetail },
  { path: '/company/:id', name: 'companydetail', component: CompanyDetail },
  { path: '*', component: NotFoundComponent}
]
