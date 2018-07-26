<template>
 <div>
  <NavBar></NavBar>
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
        <md-field>
         <label for="person-firstname">nome</label>
         <md-input 
          name="person-firstname" 
          id="person-firstname"
          v-model="people.firstName"
          ></md-input>
        </md-field>
       </div> 
       <div class="md-layout-item md-small-size-100">
        <md-field>
         <label for="person-lastname">sobrenome</label>
         <md-input 
          name="person-lastname" 
          id="person-lastname"
          v-model="lastName"
          ></md-input>
        </md-field>
       </div>
       <div class="md-layout-item md-large-size-50">
        <md-field>
         <label for="person-email">email</label>
         <md-input 
          name="person-email" 
          id="person-email"
          v-model="people.email"></md-input>
        </md-field>
       </div>
       <div class="md-layout-item md-large-size-50">
        <md-field>
         <label for="companies">lista de empresas</label>
         <md-select 
          name="companies" 
          id="companies"
          md-dense
          multiple
          v-model="selectedCompanies"
         >
           <md-option :value="company.name" v-for="company in companies" v-bind:key="company.id">
             {{ company.name }}
            </md-option>
          </md-select>
        </md-field>
       </div>
     </div> 
    </md-card-content>
    <md-button>Save</md-button>
   </md-card>
  </form> 
 </div>
</template>
<script>
 import NavBar from '../NavBar.vue'
 import { validationMixin } from 'vuelidate'
 import Company from '../../models/Business'
 import {
    required,
    email,
    minLength,
    maxLength
 } from 'vuelidate/lib/validators'
 export default {
  name: 'NovaPessoa',
  mixins: [validationMixin],
  components: {
   NavBar,
  },
  data: () => {
    return {
      people: {
        firstName: null,
        lastName: null,
        email: null,
        selectedCompanies: []
      },
      companies: new Business(),
      sending: false,
    }
  },
  validations: {
    people: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required
      }
    }
  },
  methods: {
    sendForValidate () {
      this.$v.$touch()
      console.log("entrou foi aqui")
      if (!this.$v.$invalid) {
        console.log("entrou")
        this.savePeople()
      }
    },
    createOptions (people) {
      const peopleHeader = {
        firstname: people.firstName,
        lastname: people.lastName,
        email: people.email,
        want_visit: people.want_visit
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(peopleHeader),
        headers: {
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      }
      return options
    },
    savePeople () {
      this.sending = true;
      const options = this.createOptions(this.people)
      fetch('https://parseapi.back4app.com/classes/Company', options)
      .then(response => { 
          response.json().then(json => {
            this.sending = false
            this.clearForm()
            console.log('check it out');
            console.log(json)
          })
        })
      },
  },
  beforeCreate () {
    fetch('https://parseapi.back4app.com/classes/Company/', {
      method: 'get',
      headers: {         
        "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
        "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
      },
    } 
    ).then(response => 
        response.json().then(json => {
          this.companies = json.results
    }))
  },
  sendSave () {
    
  }
 }
</script>
<style lang="scss" scoped>
  form {
    padding: 100px 0;
  }
</style>

