<template>
  <div>
    <NavBar></NavBar>
    <div class="container-people">
      <md-table v-model="people" md-card md-fixed-header>
          <md-table-toolbar>
            <h1 class="md-title">Pessoas</h1>
            <router-link to="/new-people"> 
            <md-button class="md-raised">
              <md-icon class="md-size-1x">add</md-icon> nova Pessoa</md-button>
            </router-link>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }" >
            <md-table-cell md-label="Nome" md-sort-by="firstname lastname">
              {{ item.firstname }} {{item.lastname}}</md-table-cell>
            <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
            <md-table-cell md-label="Detalhes" md-sort-by="objectId">
              <router-link :to="'/people/' + item.objectId">Detalhes</router-link>
            </md-table-cell>
            <md-table-cell md-label="Deletar" md-sort-by="objectId">
              <span v-on:click="deletePeople(item.objectId)">
                <md-icon id="icon-del">delete</md-icon></span>
            </md-table-cell>
          </md-table-row>
      </md-table>
    </div>  
  </div>

</template>
<script>
 import NavBar from '../NavBar.vue'
export default {
  name: 'PeopleList',
  components: {
   NavBar,
  },
  data: () => ({
   people: []
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
          this.people = json.results
          console.log(this.people)
    }))
  },
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
    deletePeople (idPeople) {
      const options = this.createOptions()
      fetch(`https://parseapi.back4app.com/classes/People/${idPeople}`, options)
      .then(response =>{ 
        response.json().then(json => {
          this.people = this.people.filter(bus => bus.objectId !== idPeople)
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
 .container-people {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  width: 60%;
  margin: 0 auto;
 }

</style>

