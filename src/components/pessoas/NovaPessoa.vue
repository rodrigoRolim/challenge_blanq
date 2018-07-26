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
          v-model="people.firstname"
          ></md-input>
        </md-field>
       </div> 
       <div class="md-layout-item md-small-size-100">
        <md-field>
         <label for="person-lastname">sobrenome</label>
         <md-input 
          name="person-lastname" 
          id="person-lastname"
          v-model="lastname"
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
          v-model="want_visit"
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
        firstname: null,
        lastname: null,
        email: null,
        want_visit: []
      },
      companies: new Business(),
      sending: false,
    }
  },
  validations: {
    people: {
      firstname: {
        required
      },
      lastname: {
        required
      },
      email: {
        required
      },
      want_visit: {
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
        firstname: people.firstname,
        lastname: people.lastname,
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
    clearForm () {
        this.$v.$reset()
        this.people.firstname = null
        this.people.lastname = null
        this.people.email = null
        this.people.want_visit = []
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

