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
  peopleListAll (state, peoples) {
    state.peoples = peoples
  },
  addPeople (state, people) {
    if(state.peoples.some(peop => peop.objectId = people.objectId)) {
      state.peoples.push(people)
    } else {
      state.peoples = state.peoples.filter(peop => peop.objectId !== people.objectId)
      state.peoples.push(people)
    }
  },
  deletePeople (state, idPeople) {
    state.peoples = state.peoples.filter(people => people.objectId !== idPeople)
  }
 },
 actions: {
  getCompanyList (context) {
   
  },
  getPeopleList (context) {
    
  } 
 }
})