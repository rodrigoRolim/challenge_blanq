<template>
<div>
 <NavBar></NavBar>
 <div class="container-persons">
   <md-table v-model="persons" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Pessoas</h1>
         <router-link to="/new-persons"> 
        <md-button class="md-raised">
          <md-icon class="md-size-1x" >add</md-icon> nova Pessoa</md-button>
      </router-link>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Detalhes" md-sort-by="detail"><a href="">{{ item.detail }}</a></md-table-cell>
      </md-table-row>
   </md-table>
 </div>  
</div>

</template>
<script>
 import NavBar from '../NavBar.vue'
export default {
  name: 'TablePersons',
  components: {
   NavBar,
  },
  data: () => ({
   persons: [
    {
     id: 1,
     name: 'pessoa 1',
     email: 'pessoa@email.com',
     detail: 'detalhes',
    },
    {
     id: 2,
     name: 'pessoa 1',
     email: 'pessoa@email.com',
     detail: 'detalhes',
    },
    {
     id: 3,
     name: 'pessoa 1',
     email: 'pessoa@email.com',
     detail: 'detalhes',
    },
    {
     id: 4,
     name: 'pessoa 1',
     email: 'pessoa@email.com',
     detail: 'detalhes',
    },
   ]
  }),
}
</script>
<style lang="scss">
 .container-persons {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  width: 60%;
  margin: 0 auto;
 }

</style>

