<template>
<div>
  <nav-bar></nav-bar>
  <div class="md-layout md-alignment-center-center">
    <md-list>
      <md-list-item>
       <md-avatar>
        <img src="https://placeimg.com/40/40/people/1" alt="People">
       </md-avatar>
        <div class="md-list-item-text">
         <p>nome: {{ people.firstname }}</p>
         <p>sobrenome: {{ people.lastname }}</p>
         <p>email: {{ people.email }}</p>
        </div>
      </md-list-item>
      <md-divider class="md-inset"></md-divider>
      <md-subheader>Lista de empresas: </md-subheader>
      <md-list-item v-for="company in people.want_visit" v-bind:key="company"
       :to="'/company/' + company">{{ company }}</md-list-item>
    </md-list>
  </div>
</div>
</template>
<script>
import NavBar from '../NavBar.vue'
import { Person } from '../../models/Person'
 export default {
  name: 'PeopleDetail',
  components: {
   NavBar
  },
  data: () => ({
   people: new Person()
  }),
  beforeCreate () {
   fetch('https://parseapi.back4app.com/classes/People/', {
      method: 'get',
      headers: {         
        "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
        "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
      },
    } 
    ).then(response => 
        response.json().then(json => {
          this.people = json.results.filter(people => people.objectId == this.$route.params.id).pop()
          console.log(json.results)
    }))
  },
 }
</script>
<style lang="scss" scoped>
  .md-layout {
   padding: 100px 0;
  }
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>

