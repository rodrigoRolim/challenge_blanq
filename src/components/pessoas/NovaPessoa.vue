<template>
 <div>
  <NavBar></NavBar>
  <form class="md-layout  md-alignment-space-around-center">
   <md-card class="md-layout-item md-size-50 md-small-size-100">
    <md-card-header>
     <div class="md-title">Pessoas</div>
    </md-card-header>
    <md-card-content>
     <div class="md-layout md-gutter">
       <div class="md-layout-item md-small-size-100">
        <md-field>
         <label for="person-firstname">nome</label>
         <md-input 
          name="person-firstname" 
          id="person-firstname"></md-input>
        </md-field>
       </div> 
       <div class="md-layout-item md-small-size-100">
        <md-field>
         <label for="person-lastname">sobrenome</label>
         <md-input 
          name="person-lastname" 
          id="person-lastname"></md-input>
        </md-field>
       </div>
       <div class="md-layout-item md-large-size-50">
        <md-field>
         <label for="person-email">email</label>
         <md-input 
          name="person-email" 
          id="person-email"></md-input>
        </md-field>
      
       </div>
       <div class="md-layout-item md-large-size-50">
        <md-field>
         <label for="list-business">lista de empresas</label>
         <md-select 
          name="list-business" 
          id="list-business">
           <md-option></md-option>
          </md-select>
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
 export default {
  name: 'NovaPessoa',
  components: {
   NavBar,
  }
 }
</script>
<style>

</style>

