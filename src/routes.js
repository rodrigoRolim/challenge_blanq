import App from './App.vue'
import CompanyList from './components/empresas/CompanyList.vue'
import NewCompany from './components/empresas/NewCompany.vue'
import PeopleList from './components/pessoas/PeopleList.vue'
import NewPeople from './components/pessoas/NewPeople.vue'
import CompanyDetail from './components/empresas/CompanyDetails.vue'
import PeopleDetail from './components/pessoas/PeopleDetail.vue'
import NotFoundComponent from './components/NotFoundComponent.vue'

export default [
  { path: '/', redirect: '/companies' },
  { path: '/companies', name: 'company',  component: CompanyList },
  { path: '/new-company', name: 'newcompany', component: NewCompany },
  { path: '/new-company/:id', name: 'updatecompany', component: NewCompany},
  { path: '/peoples', name: 'people', component: PeopleList },
  { path: '/new-people', name: 'newpeople', component: NewPeople },
  { path: '/new-people/:id', name: 'updatepeople', component: NewPeople },
  { path: '/people/:id', name: 'peopledetail', component: PeopleDetail },
  { path: '/company/:id', name: 'companydetail', component: CompanyDetail },
  { path: '*', component: NotFoundComponent}
]
