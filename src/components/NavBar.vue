<template>
 <nav>
   <md-toolbar class="md-primary">
     <h3 class="md-title">Challenge Blanq</h3>
     <div class="btn-nav">
       <router-link to="/business"> 
        <md-button class="md-raised" id="btn-bus">Empresas</md-button>
      </router-link>
      <router-link to="/staff"> 
        <md-button class="md-raised">Pessoas</md-button>
      </router-link>
     </div>
      
   </md-toolbar>
 </nav>
</template>
<script>
 export default {
  name: 'navbar'
 }
</script>
<style lang="scss">
 #btn-bus {
   background-color:rgb(12, 136, 105);
   color: white;
 }
 .btn-nav {
   margin-left: 10px;
 }
 h3 {
   margin-right: 30px;
 }
</style>

