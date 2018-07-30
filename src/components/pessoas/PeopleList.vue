<template>
  <div>
    <NavBar></NavBar>
    <div class="container-people">
      <md-table v-model="peoples" md-card md-sort="firstname lastname" md-fixed-header>
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
            <md-table-cell md-label="Editar" md-sort-by="objectId">
              <router-link :to="'/new-people/'+item.objectId">
                <md-icon id="icon-edit">edit</md-icon>
              </router-link>
            </md-table-cell>
          </md-table-row>
      </md-table>
    </div>  
  </div>

</template>
<script>
 import NavBar from '../NavBar.vue'
 import { People } from '../../models/People' 
export default {
  name: 'PeopleList',
  components: {
   NavBar,
  },
  data: () => ({
   peoples: new People([])
  }),
  created () {
   this.getPeoples
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
    deleteState (idPeople) {
      this.$store.commit("deletePeople", idPeople)
    },
    deletePeople (idPeople) {
      const options = this.createOptions()
      fetch(`https://parseapi.back4app.com/classes/People/${idPeople}`, options)
      .then(response =>{ 
        response.json().then(json => {
          this.peoples = this.peoples.filter(people => people.objectId !== idPeople)
          this.deleteState(idPeople)
        })
      })
    }
  },
  computed: {
    getPeoples: function () {
      const store = this.$store.state.peoples
      if(store.length == 0) {
        this.$fetch.read('People')
          .then(response => response.json())
          .then(json => {
            this.peoples = json.results
            this.$store.commit('peopleListAll', this.peoples)
          })
      } else {
        this.peoples = this.$store.state.peoples
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .container-people {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  width: 70%;
  margin: 0 auto;
 }
 #icon-del {
   color: rgb(255, 59, 59);
   cursor: pointer;
 }
 #icon-edit {
   color: rgb(0, 119, 255)
 }
</style>

