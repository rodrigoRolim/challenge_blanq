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
       <div class="md-layout-item md-large-size-50">
        <md-field :class="getValidationClass('want_visit')">
         <label for="companies">lista de empresas</label>
         <md-select 
          name="companies" 
          id="companies"
          md-dense
          :disabled="sending" 
          multiple
          v-model="people.want_visit"
         >
           <md-option :value="company.name" v-for="company in companies" v-bind:key="company.id">
             {{ company.name }}
            </md-option>
          </md-select>
          <span class="md-error" v-if="!$v.people.want_visit.required">Escolha as empresas</span>
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
      },
      want_visit: {
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
    confirmeLastPeople () {
       this.sending = false
       this.lastPeople = this.people.firstname.concat(' ').concat(this.people.lastname)
       this.userSaved = true
    },
    savePeople () {
      this.sending = true;
      const options = this.createOptions(this.people)
      fetch('https://parseapi.back4app.com/classes/People', options)
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

