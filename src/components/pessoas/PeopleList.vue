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
  mounted () {
   this.getPeoples()
  },
  methods: {
    deletePeople (idPeople) {
      this.$fetch.erase('People', idPeople).then(response => {
        response.json().then(json => {
          this.peoples = this.peoples.filter(people => people.objectId !== idPeople)
          this.deleteOfCache(idPeople)
        })
      })
    },
    deleteOfCache (idPeople) {
      try {
        let peoples = JSON.parse(localStorage.getItem('peoples'))
                        .filter(people => people.objectId !== idPeople)
        const newPeoples = JSON.stringify(peoples)
        localStorage.removeItem('peoples')
        localStorage.setItem('peoples', newPeoples)
      } catch (e) {
        localStorage.removeItem('peoples')
      }
    },
    getPeoples: function () {
      const peoples = JSON.parse(localStorage.getItem('peoples'))
      if(peoples == null) {
        try {
          this.$fetch.read('People')
            .then(response => response.json())
            .then(json => {
              this.peoples = json.results
              localStorage.setItem('peoples', JSON.stringify(this.peoples))
          })
        } catch (e) {
          localStorage.removeItem('peoples')
        }
      } else {
        this.peoples = JSON.parse(localStorage.getItem('peoples'))
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
