import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
  companies: [],
  peoples: []
 },
 mutations: {
  companyListAll (state, company) {
   console.log(company)
   state.companies = company
  },
  addCompany (state, company) {
    //console.log(state.companies.some(comp => comp.objectId == company.objectId))
    if(state.companies.some(comp => comp.objectId == company.objectId)){
      state.companies.push(company)
    } else {
      state.companies = state.companies.filter(company => company.objectId !== company.objectId)
      state.companies.push(company)
    }
    
  },
  deleteCompany (state, idCompany) {
    state.companies = state.companies.filter(company => company.objectId !== idCompany)
  },
  peopleListAll (state, {people}) {
    state.people = people
  }
 },
 actions: {
  getCompanyList (context) {
   
  },
  getPeopleList (context) {
    
  } 
 }
})