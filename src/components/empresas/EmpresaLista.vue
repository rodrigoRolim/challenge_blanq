<template>
<div>
 <NavBar></NavBar>
 <div class="container-business">
   <md-table v-model="business" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Empresas</h1>
         <router-link to="/new-business"> 
        <md-button class="md-raised" id="btn">
          <md-icon id="ic">add</md-icon> nova Empresa</md-button>
      </router-link>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Endereço" md-sort-by="address">{{ item.address }}</md-table-cell>
        <md-table-cell md-label="Detalhes" >
          <router-link to="/details-business">detalhes</router-link>
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
   NavBar,
  },
  data: () => ({
   business: [
    {
     id: 1,
     name: 'empresa 1',
     address: 'endereço 1',
     detail: 'detalhes',
    },
    {
     id: 2,
     name: 'empresa 1',
     address: 'endereço 1',
     detail: 'detalhes',
    },
    {
     id: 3,
     name: 'empresa 1',
     address: 'endereço 1',
     detail: 'detalhes',
    },
    {
     id: 4,
     name: 'empresa 1',
     address: 'endereço 1',
     detail: 'detalhes',
    },
   ]
  }),
}
 
</script>
<style lang="scss">
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
</style>

