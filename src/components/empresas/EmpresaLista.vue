<template>
 <div>
       <md-table v-model="users" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Empresas</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nome" md-sort-by="id" md-numeric>{{}}</md-table-cell>
        <md-table-cell md-label="Endereço" md-sort-by="name">{{  }}</md-table-cell>
        <md-table-cell md-label="Detalhes" md-sort-by="email">{{  }}</md-table-cell>
      </md-table-row>
    </md-table>
 </div>
</template>
<script>
  
</script>
<style lang="scss">

</style>

