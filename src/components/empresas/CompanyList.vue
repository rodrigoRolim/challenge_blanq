<template>
<div>
 <nav-bar></nav-bar>
 <div class="container-business">
   <md-table v-model="companies" md-card md-sort="name" md-sort-order="asc" md-fixed-header>
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
        <md-table-cell md-label="Editar" md-sort-by="objectId">
          <router-link :to="'/new-company/'+item.objectId"><md-icon id="icon-edit">edit</md-icon></router-link>
        </md-table-cell>
      </md-table-row>  
   </md-table>
 </div>
</div>
</template>
<script>
import NavBar from '../NavBar.vue'
export default {
  name: 'TableBusiness',
  components: {
   NavBar  
  },
  data: () => ({
   companies: []
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
    deleteState (idCompany) {
      this.$store.commit("deleteCompany", idCompany)
    },  
    deleteCompany (idCompany) {   
      const options = this.createOptions()
      fetch(`https://parseapi.back4app.com/classes/Company/${idCompany}`, options)
      .then(response =>{ 
        response.json().then(json => {
          this.companies = this.companies.filter(bus => bus.objectId !== idCompany)
          //this.$store.dispatch('getCompanyList')
          this.deleteState(idCompany)
          console.log('check it out');
          console.log(json)
        })
      })
    }
  },
  computed: {
    getCompanies: function () {
      fetch('https://parseapi.back4app.com/classes/Company/', {
        method: 'get',
        headers: {         
          "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
          "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
       }}).then(response => 
          response.json().then(json => {
            this.companies = json.results
            this.$store.commit('companyListAll', this.companies)
      }))
      
    }
  },
  created () {
    this.getCompanies
  },
}
</script>
<style lang="scss" scoped>
  $nameBtnColor: white;
  $iconDelColor: rgb(255, 59, 59);
  $iconEditColor: rgb(0, 119, 255);

 .container-business {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  width: 70%;
  margin: 0 auto;
 }
  #btn {
  background-color: rgb(12, 136, 105);
  color: $nameBtnColor;
 }
 #ic {
    color: $nameBtnColor;
 }
 #icon-del {
   color: $iconDelColor;
   cursor: pointer;
 }
 #icon-edit {
   color: $iconEditColor;
 }
 #icon-del:hover {
   transform: scale(1.2)
 }
 #icon-del:active {
   transform: scale(1.0)
 }
</style>

