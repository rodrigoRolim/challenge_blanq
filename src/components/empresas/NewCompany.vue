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
       <md-field>
        <label for="company-name">Nome da empresa</label>
        <md-input 
         name="company-name" 
         id="company-name"
         :disabled="sending" 
         v-model="form.name"/>
         <span class="md-error" v-if="!$v.form.name.required">The first name is required</span>
       </md-field>
      </div> 
     <div class="md-layout-item md-large-size-100">
      <md-field>
       <label for="">Endereço da empresa</label>
       <md-input 
        name="company-address" 
        id="company-address"
        :disabled="sending" 
        v-model="form.address"/>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">Adicione telefones</label>
       <md-input 
        name="company-phones" 
        id="company-phones" 
        :disabled="sending" 
        v-model="phone"/>
        <md-button v-on:click="addPhone" class="md-fab md-mini md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">Adicione imagens</label>
       <md-input 
        name="company-images" 
        id="company-images" 
        :disabled="sending" 
        v-model="picture"/>
        <md-button v-on:click="addPictures" class="md-fab md-mini md-primary">
         <md-icon>add</md-icon>
        </md-button>
      </md-field>
     </div>
    </div> 
   </md-card-content>
   <div class="listas">
     <md-list class="lista-phones">
      <md-list-item v-for="phone in phones" v-bind:key="phone">
        {{ phone }} <span v-on:click="removePhone(phone)"><md-icon >delete_forever</md-icon></span>
        </md-list-item>
     </md-list>
     <md-list class="lista-pictures">
      <md-list-item v-for="picture in pictures" v-bind:key="picture">
        {{ picture }} <span v-on:click="removePicture(picture)"><md-icon >delete_forever</md-icon></span>
      </md-list-item>
     </md-list>
   </div> 
   <md-button type="submit" :disabled="sending">Save</md-button>
  </md-card>
 </form> 
 </div>
</template>
<script>
 import NavBar from '../NavBar.vue'
 import { Business } from '../../models/Business'
 import { validationMixin } from 'vuelidate'
 import {
    required,
    email,
    minLength,
    maxLength
 } from 'vuelidate/lib/validators'
 export default {
  name: 'NewCompany',
  mixins: [validationMixin],
  components: {
   NavBar
  },
  data: () => {
   return {
    form: {
      name: null,
      address: null,
      pictures: [],
      phones: [],
    },
    phones: [],
    pictures: [],
    phone: '',
    picture: '',
    company: new Business(),
    sending: false,
   }
  },
  validations: {
    form: {
      name: {
        required
      },
      address: {
        required
      }
    },
    picture: {
      required
    },
    phone: {
      required
    }
  },
  methods: {
    addPhone () {
      this.form.phones.push(this.phone)
      this.phones.push(this.phone)
    },
    addPictures () {
      this.form.pictures.push(this.picture)
      this.pictures.push(this.picture.slice(0,30).concat(' ...'))
    },
    removePhone (phone) {
      this.form.phones = this.form.phones.filter(ph => ph !== phone)
    },
    removePicture (picture) {
      this.form.pictures = this.form.pictures.filter(pic => pic !== picture)
    },
    sendForValidate () {
      this.$v.$touch()
      console.log("entrou foi aqui")
      if (!this.$v.$invalid) {
        console.log("entrou")
        this.saveCompany()
      }
    },
    createOptions (company) {
      const myCompany = {
        name: company.name,
        address: company.address,
        phones: company.phones,
        pictures: company.pictures,
        who_visited: ["asdadasda"]
      }
      const options = {
        method: 'POST',
        body: JSON.stringify(myCompany),
        headers: {
         "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
         "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",
        }
      }
      return options
    },
    saveCompany () {
      this.sending = true;
      this.company = this.form;
      const options = this.createOptions(this.company)
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
        this.form.name = null
        this.form.address = null
        this.form.pictures = []
        this.form.phones = []
        this.phones = []
        this.pictures = []
        this.phone = null
        this.picture = null
      },
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
</style>
