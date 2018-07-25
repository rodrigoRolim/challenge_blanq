<template>
 <div>
  <NavBar></NavBar>
 <form novalidate class="md-layout  md-alignment-space-around-center" @submit="sendSave">
  <md-card class="md-layout-item md-size-50 md-small-size-100">
   <md-card-header>
    <div class="md-title">Empresas</div>
   </md-card-header>
   <md-card-content>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-small-size-100">
       <md-field>
        <label for="">Nome da empresa</label>
        <md-input 
         name="business-name" 
         id="business-name"
         v-model="form.name"></md-input>
       </md-field>
      </div> 
     <div class="md-layout-item md-large-size-100">
      <md-field>
       <label for="">Endereço da empresa</label>
       <md-input 
        name="business-address" 
        id="business-address"
        v-model="form.address"></md-input>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">Adicione telefones</label>
       <md-input 
        name="business-phones" 
        id="business-phones" v-model="phone"></md-input>
        <md-button v-on:click="addPhone" class="md-fab md-mini md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">Adicione imagens</label>
       <md-input 
        name="business-images" 
        id="business-images" v-model="picture"></md-input>
        <md-button v-on:click="addPictures" class="md-fab md-mini md-primary">
         <md-icon>add</md-icon>
        </md-button>
      </md-field>
     </div>
    </div> 
   </md-card-content>
   <div class="listas">
     <md-list class="lista-left">
      <md-list-item v-for="phone in form.phones" v-bind:key="phone">
        {{ phone }} <span v-on:click="removePhone(phone)"><md-icon >delete_forever</md-icon></span>
        </md-list-item>
     </md-list>
     <md-list class="lista-right">
      <md-list-item v-for="picture in form.pictures" v-bind:key="picture">
        {{ picture }} <span v-on:click="removePicture(picture)"><md-icon >delete_forever</md-icon></span>
      </md-list-item>
     </md-list>
   </div> 
   <md-button v-on:click="sendSave">Save</md-button>
  </md-card>
 </form> 
 </div>
</template>
<script>
 import NavBar from '../NavBar.vue'
 import { Business } from '../../models/Business'

 export default {
  name: 'NovaEmpresa',
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
    phone: '',
    picture: '',
    business: new Business()
   }
  },
  methods: {
    addPhone () {
      this.form.phones.push(this.phone);
    },
    addPictures () {
      this.form.pictures.push(this.picture);
    },
    removePhone (phone) {
      this.form.phones = this.form.phones.filter(ph => ph !== phone)
    },
    removePicture (picture) {
      this.form.pictures = this.form.pictures.filter(pic => pic !== picture)
    },
    sendSave () {
      this.business = this.form;
      console.log(this.business.name)
      fetch('https://parseapi.back4app.com/classes/Company/', {
        method: 'post',
        headers: {         
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
        },
        body: {
          "name": "Company Test",   
          "address":"Avenida Ayrton Senna da Silva, 200",         
          "phones":["(43) 9999-9999"], 
          "pictures": ["https://cdn.pixabay.com/photo/2018/06/30/09/29/music3507317_960_720.jpg"],         
          "who_visited": ["AsPVqGwpqQ"] 
        }
      }).then(response =>{ 
          response.json().then(json => {
            console.log('check it out');
            console.log(json)
          })
        })
      },
    },
  beforeDestroy () {
   this.business = null
   delete this.business
  },
 }
</script>
<style lang="scss">
.listas {
  display: flex;
  flex-direction: row;
}
.lista-right {
  width: 50%;
}
.lista-left {
  width: 50%;
}
form {
 padding: 100px 0;
}
</style>
