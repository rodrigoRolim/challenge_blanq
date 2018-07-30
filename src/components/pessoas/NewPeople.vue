<template>
 <div>
  <nav-bar></nav-bar>
  <form novalidate 
  @submit.prevent="sendForValidate"
  class="md-layout  md-alignment-space-around-center">
   <md-card class="md-layout-item md-size-50 md-small-size-100">
    <md-card-header>
     <div class="md-title">Pessoas</div>
    </md-card-header>
    <md-card-content>
     <div class="md-layout md-gutter">
       <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('firstname')">
         <label for="person-firstname">nome</label>
         <md-input 
          name="person-firstname" 
          id="person-firstname"
          :disabled="sending" 
          v-model="people.firstname"
          />
          <span class="md-error" v-if="!$v.people.firstname.required">O nome é necessário</span>
        </md-field>
       </div> 
       <div class="md-layout-item md-small-size-100">
        <md-field :class="getValidationClass('lastname')">
         <label for="person-lastname">sobrenome</label>
         <md-input 
          autocomplete="given-name"
          type="text"
          name="person-lastname" 
          id="person-lastname"
          :disabled="sending" 
          v-model="people.lastname"
          />
          <span class="md-error" v-if="!$v.people.lastname.required">O sobrenome é necessário</span>
        </md-field>
       </div>
       <div class="md-layout-item md-large-size-50">
        <md-field :class="getValidationClass('email')">
         <label for="person-email">email</label>
         <md-input
         type="email" 
          name="person-email" 
          id="person-email"
          :disabled="sending" 
          v-model="people.email"/>
          <span class="md-error" v-if="!$v.people.email.required">O email é necessário</span>
          <span class="md-error" v-else-if="!$v.people.email.email">Email inválido</span>
        </md-field>
       </div>
       <div class="md-layout-item md-large-size-50" >
         <!-- <company-visit v-bind:company-list="companies"></company-visit> -->
        <md-field>
         <label for="companies">lista de empresas</label>
         <md-select 
          name="companies" 
          id="companies"
          md-dense
          multiple
          v-model="people.want_visit"
         >
           <md-option :value="company.objectId" 
            v-for="company in companies"
            v-bind:key="company.id"
            :selected="people.want_visit.includes(company)">
             {{ company.name }}
            </md-option>
          </md-select> 
        </md-field>
       </div>
     </div> 
    </md-card-content>
    <md-progress-bar md-mode="indeterminate" v-if="sending" />
    <md-card-actions>
       <md-button type="submit" class="md-primary" :disabled="sending" >Save</md-button>
    </md-card-actions>
   </md-card>
   <md-snackbar :md-active.sync="userSaved">O {{ lastPeople }} foi salvo com sucesso!</md-snackbar>
  </form> 
 </div>
</template>
<script>
 import NavBar from '../NavBar.vue'
 import { validationMixin } from 'vuelidate'
 import {
    required,
    email
 } from 'vuelidate/lib/validators'
 export default {
  name: 'NewPeople',
  mixins: [validationMixin],
  components: {
   NavBar,
  },
  data: () => ({
   
    people: {
      id: null,
      firstname: null,
      lastname: null,
      email: null,
      want_visit: []
    },
    userSaved: false,
    companies: [],
    sending: false,
    lastPeople: null

  }),
  validations: {
    people: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        email,
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
        const field = this.$v.people[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
    },
    sendForValidate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.savePeople()
      }
    },
    requestMethod (params) {
      return params !== undefined ? 'PUT': 'POST'
    },
    requestBody (people) {
       const peopleHeader = {
        objectId: this.$route.params.id,
        firstname: people.firstname,
        lastname: people.lastname,
        email: people.email,
        want_visit: people.want_visit
      }
      return peopleHeader
    },
    requestUrl (id) {
      return id !== undefined ? 
        `https://parseapi.back4app.com/classes/People/${id}`:
        `https://parseapi.back4app.com/classes/People`; 
    },
    createOptions (people) {
      const options = {
        method: this.requestMethod(this.$route.params.id),
        body: JSON.stringify(this.requestBody(people)),
        headers: {
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      }
      return options
    },
    addState (peoples) {
      this.$store.commit("peopleListAll", peoples)
    },
    confirmeLastPeople () {
       this.sending = false
       this.lastPeople = this.people.firstname.concat(' ').concat(this.people.lastname)
       this.userSaved = true
    },
    savePeople () {
      this.sending = true;
      fetch(this.requestUrl(this.$route.params.id),this.createOptions(this.people))
      .then(response => { 
          response.json().then(json => {
            this.confirmeLastPeople()
            this.clearForm()      
          })
        })
    },
    clearForm () {
        this.$v.$reset()
        this.people.firstname = null
        this.people.lastname = null
        this.people.email = null
        this.people.want_visit = []
    },
    searchPeople (idPeople) {
      if(this.$store.state.peoples.length == 0) {
        this.$fetch.read('People')
          .then(response => response.json())
          .then(json => {
            const people = json.results.filter(people => people.objectId == idPeople)
            this.buildPeople(people.pop())
            this.addState(json.results)
          })
      } else {
        this.buildPeople(this.$store.state.peoples
                              .filter(people => people.objectId == idPeople)
                              .pop())
      }
    },
    buildPeople (response) {
      this.people.firstname = response.firstname
      this.people.lastname = response.lastname
      this.people.email = response.email
      this.people.want_visit = response.want_visit
    },
    companiesListAll () {
      if(this.$store.state.companies.length == 0) {
        this.$fetch.read('Company')
          .then(response => response.json())
          .then(json => {
            this.companies = json.results
            this.$store.commit("companyListAll", json.results)
        })
      } else {
        this.companies = this.$store.state.companies
      }
    },
  },
  created () {
    this.companiesListAll()
    if (this.$route.params.id !== null) {
       this.searchPeople(this.$route.params.id)
    }
  },

 }
</script>
<style lang="scss" scoped>
  form {
    padding: 100px 0;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>