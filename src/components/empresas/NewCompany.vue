<template>
 <div>
  <NavBar></NavBar>
 <form novalidate class="md-layout  md-alignment-space-around-center"
  @submit.prevent="sendForValidate">
  <md-card class="md-layout-item md-size-50 md-small-size-100">
   <md-card-header>
    <div class="md-title">Empresas</div>
   </md-card-header>
   <md-card-content>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
       <md-field :class="getValidationClass('name')">
        <label for="company-name">Nome da empresa</label>
        <md-input 
         name="company-name" 
         id="company-name"
         :disabled="sending" 
         v-model="company.name"/>
         <span class="md-error" v-if="!$v.company.name.required">o nome é necessário</span>
       </md-field>
      </div> 
     <div class="md-layout-item md-large-size-100">
      <md-field :class="getValidationClass('address')">
       <label for="">Endereço da empresa</label>
       <md-input 
        name="company-address" 
        id="company-address"
        :disabled="sending" 
        v-model="company.address"/>
        <span class="md-error" v-if="!$v.company.address.required">O endereço é necessário</span>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">Adicione telefones</label>
       <md-input 
        name="company-phones" 
        id="company-phones" 
        v-model="phone"/>
        <md-button v-on:click="addPhone" class="md-fab md-mini md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field >
       <label for="">Adicione imagens</label>
       <md-input 
        name="company-images" 
        id="company-images" 
        v-model="picture"/>
        <md-button v-on:click="addPictures" class="md-fab md-mini md-primary">
         <md-icon>add</md-icon>
        </md-button>
      </md-field>
      <md-field>
        <label for="">Visitantes</label>
        <md-select
         name="company-visits"
         id="company-visits"
         multiple
         v-model="company.who_visited"
        >
          <md-option 
          :value="visit.objectId" 
          v-for="visit in peoples"
          v-bind:key="visit.objectId"
          :selected="company.who_visited.includes(visit.objectId)">
            {{ visit.firstname }} {{ visit.lastname }}
          </md-option>
        </md-select>
      </md-field>
     </div>
    </div> 
   </md-card-content>
   <md-progress-bar md-mode="indeterminate" v-if="sending" />
   <md-divider></md-divider>
   <div class="listas">
     <md-list class="lista-phones">
      <md-list-item v-for="phone in company.phones" v-bind:key="phone">
        {{ phone }} <span v-on:click="removePhone(phone)"><md-icon >delete_forever</md-icon></span>
        </md-list-item>
     </md-list>
     <md-list class="lista-pictures">
      <md-list-item v-for="picture in pictures" v-bind:key="picture">
        {{ picture }} <span v-on:click="removePicture(picture)"><md-icon >delete_forever</md-icon></span>
      </md-list-item>
     </md-list>
   </div> 
   <md-card-actions>
      <md-button type="submit" class="md-primary" :disabled="sending">Save</md-button>
   </md-card-actions>
  </md-card>
  <md-snackbar :md-active.sync="companySaved">O {{ lastCompany }} foi salvo com sucesso!</md-snackbar>
 </form> 
 </div>
</template>
<script>
 import NavBar from '../NavBar.vue'
 import { People } from '../../models/People'
 import { validationMixin } from 'vuelidate'

 import {
    required,
 } from 'vuelidate/lib/validators'
 export default {
  name: 'NewCompany',
  mixins: [validationMixin],
  components: {
   NavBar
  },
  data: () => {
   return {
    company: {
      name: null,
      address: null,
      who_visited: [],
      pictures: [],
      phones: [],
    },
    pictures: [],
    peoples: new People([]),
    lastCompany: null,
    companySaved: false,
    phone: null,
    picture: null,
    sending: false,
   }
  },
  validations: {
    company: {
      name: {
        required
      },
      address: {
        required
      } 
    }
  },
  methods: {
    addPhone () {
      this.company.phones.push(this.phone)
    },
    addPictures () {
      this.company.pictures.push(this.picture)
      this.slicedPicturePath(this.picture)
    },
    slicedPicturePath (picture) {
       this.pictures.push(/(?<=\/)[a-z\d]+(.jpg|.png|.gif|.jpeg)/.exec(picture)[0])
    },
    removePhone (phone) {
      this.company.phones = this.form.phones.filter(ph => ph !== phone)
      this.phones = this.phones.filter(ph => ph !== phone)
    },
    removePicture (picture) {
      this.company.pictures = this.company.pictures.filter(pic => pic !== picture)
      this.pictures = this.pictures.filter(pic => pic !== picture)
    },
    getValidationClass (fieldName) {
      const field = this.$v.company[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    sendForValidate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveCompany()
      }
    },
     requestMethod (params) {
      return params !== undefined ? 'PUT': 'POST'
    },
    requestBody (company) {
       const companyBody = {
        objectId: this.$route.params.id,
        name: company.name,
        address: company.address,
        who_visited: company.who_visited,
        pictures: company.pictures,
        phones: company.phones
      }
      return companyBody
    },
    requestUrl (id) {
      return id !== undefined ? 
        `https://parseapi.back4app.com/classes/Company/${id}`:
        `https://parseapi.back4app.com/classes/Company`; 
    },
    createOptions (company) {
      const options = {
        method: this.requestMethod(this.$route.params.id),
        body: JSON.stringify(this.requestBody(company)),
        headers: {
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      }
      return options
    },
    confirmeLastCompany () {
       this.sending = false
       this.lastCompany = this.company.name
       this.companySaved = true
    },
    saveCompany () {
      this.sending = true;
      fetch(this.requestUrl(this.$route.params.id), this.createOptions(this.company))
      .then(response => { 
          response.json().then(json => {
            this.confirmeLastCompany()
            this.clearForm()
          })
        })
      },
      searchCompany (idCompany) {
        if(this.$store.state.companies.length == 0) {
           this.$fetch.read('Company')
              .then(response => response.json())
              .then(json => {
                const company = json.results.filter(company => company.objectId == idCompany)
                this.buildCompany(company.pop())
                this.$store.commit("companyListAll", json.results)
              })
        } else {
          this.buildCompany( this.$store.state.companies
                              .filter(company => company.objectId == idCompany)
                              .pop())
        }
     },
     buildCompany (company) {
       this.company = company
       this.takePictures(company.pictures)
       
     },
     takePictures (pictures) {
       pictures.forEach(picture => {
          this.slicedPicturePath(picture)
       });
      
     },
      clearForm () {
        this.$v.$reset()
        this.company.name = null
        this.company.address = null
        this.company.pictures = []
        this.company.phones = []
        this.company.who_visited = []
        this.phones = []
        this.pictures = []
        this.phone = null
        this.picture = null
      },
       peoplesListAll () {
         const store = this.$store.state.peoples
         if(store == 0) {
            this.$fetch.read('People')
              .then(response => response.json())
              .then(json => {
                this.peoples = json.results
                this.$store.commit("peopleListAll", json.results)
              })
         } else {
           this.peoples = this.$store.state.peoples
         }
          
       },
    },
    created () {
      this.peoplesListAll()
      if (this.$route.params.id !== undefined) {
        this.searchCompany(this.$route.params.id)
      }
    },
    beforeDestroy () {
      this.company = null
      delete this.company
    },
 }
</script>
<style lang="scss" scoped>
.listas {
  display: flex;
  flex-direction: row;
}
.lista-pictures {
  width: 50%;
}
.lista-phones {
  width: 50%;
}
form {
 padding: 100px 0;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-icon {
  cursor: pointer;
}
</style>
