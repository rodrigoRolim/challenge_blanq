<template>
<div>
 <nav-bar></nav-bar>
 <div class="container-business">
   <md-table v-model="business" md-card md-sort="name" md-sort-order="asc" md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">Empresas</h1>
         <router-link to="/new-company"> 
        <md-button class="md-raised" id="btn">
          <md-icon id="ic">add</md-icon> nova Empresa</md-button>
      </router-link>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" class="md-scrollbar">
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Endereço" md-sort-by="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Detalhes" md-sort-by="objectId" >
          <router-link :to="'/company/'+item.objectId">detalhes</router-link>
        </md-table-cell>
        <md-table-cell md-label="Deletar" md-sort-by="objectId">
          <span v-on:click="deleteCompany(item.objectId)"><md-icon id="icon-del">delete</md-icon></span>
        </md-table-cell>
      </md-table-row>
      
   </md-table>
 </div>
</div>
</template>
<script>
import NavBar from '../NavBar.vue'
import EmptyList from '../EmptyList.vue'
export default {
  name: 'TableBusiness',
  components: {
   NavBar,
   EmptyList
  },
  data: () => ({
   business: []
  }),
  methods: {
    createOptions () {
      const options = {
        method: 'DELETE',
        headers: {
         "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
         "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG",  
        }
      }
      return options
    },
    deleteCompany (idCompany) {
   
      const options = this.createOptions()
      fetch(`https://parseapi.back4app.com/classes/Company/${idCompany}`, options)
      .then(response =>{ 
        response.json().then(json => {
          this.business = this.business.filter(bus => bus.objectId !== idCompany)
          console.log('check it out');
          console.log(json)
        })
      })
    }
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
          this.business = json.results
          console.log(json.results)
    }))
  },
}
</script>
<style lang="scss" >
 .container-business {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  width: 60%;
  margin: 0 auto;
 }
  #btn {
  background-color: rgb(12, 136, 105);
  color: white;
 }
 #ic {
     color: white;
 }
 #icon-del {
   color: rgb(255, 59, 59);
   cursor: pointer;
 }
 #icon-del:hover {
   transform: scale(1.2)
 }
 #icon-del:active {
   transform: scale(1.0)
 }
</style>

