<template>
 <div>
  <NavBar></NavBar>
 <form class="md-layout  md-alignment-space-around-center">
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
         id="business-name"></md-input>
       </md-field>
      </div> 
     <div class="md-layout-item md-large-size-100">
      <md-field>
       <label for="">Endereço da empresa</label>
       <md-input 
        name="business-address" 
        id="business-address"></md-input>
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
   <md-button>Save</md-button>
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
    phone: '',
    picture: '',
    business: new Business()
   }
  },
  methods: {
    addPhone () {
      this.business.phones.push(this.phone);
    },
    addPictures () {
      this.business.pictures.push(this.pictures);
    }
  },
  beforeDestroy () {
   this.business = null
   delete this.business
  },
 }
</script>
<style>
form {
 padding: 100px 0;
}
</style>
