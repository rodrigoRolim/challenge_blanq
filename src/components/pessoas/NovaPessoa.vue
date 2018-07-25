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
        <label for="">nome</label>
        <md-input 
         name="business-name" 
         id="business-name"></md-input>
       </md-field>
      </div> 
     <div class="md-layout-item md-large-size-100">
      <md-field>
       <label for="">sobrenome</label>
       <md-input 
        name="business-address" 
        id="business-address"></md-input>
      </md-field>
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">email</label>
       <md-input 
        name="business-phones" 
        id="business-phones"></md-input>
      </md-field>
    
     </div>
     <div class="md-layout-item md-small-size-100">
      <md-field>
       <label for="">lista de empresas</label>
       <md-input 
        name="business-images" 
        id="business-images"></md-input>
       <md-button class="md-fab md-mini md-primary">
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
 
</script>
<style>

</style>

