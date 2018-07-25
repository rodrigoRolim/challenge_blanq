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
         <label for="companies">lista de empresas</label>
         <md-select 
          name="companies" 
          id="companies"
          md-dense
          multiple
          v-model="selectedCompanies"
         >
           <md-option :value="company.name" v-for="company in companies" v-bind:key="company.id">
             {{ company.name }}
            </md-option>
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
  },
  data: () => {
    return {
      companies: [],
      selectedCompanies: []
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
          this.companies = json.results
    }))
  },

 }
</script>
<style>

</style>

