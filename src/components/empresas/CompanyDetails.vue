<template>
<div>
    <NavBar></NavBar> 
    <div class="container-details">
    <div class="md-layout">
      <md-toolbar :md-elevation="1">
        <span class="md-title">Informações</span>
      </md-toolbar>
    <md-content class="md-layout">
      <md-list  >
        <md-list-item>Nome: {{ company.name }}</md-list-item>
        <md-list-item>Endereço: {{ company.address }}</md-list-item>
        <md-list-item>Phones: {{ company.name }}</md-list-item>
      </md-list>
      <md-list  >
        <md-subheader >Visitantes: </md-subheader>
        <md-list-item
         :to="'/people/' + visited"
         v-for="visited in company.who_visited" v-bind:key="visited">
          {{ visited }}
        </md-list-item>
      </md-list>
    </md-content>
    </div>
    <div class="container-pictures">
      <md-content class="md-layout md-alignment-center">
        <md-card
          v-for="picture in company.pictures" v-bind:key="picture">
          <md-card-media-actions>
            <md-card-media>
              <img :src="picture" alt="Cover">
            </md-card-media>
            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>
              <md-button class="md-icon-button">
                <md-icon>bookmark</md-icon>
              </md-button>
              <md-button class="md-icon-button">
                <md-icon>share</md-icon>
              </md-button>
            </md-card-actions>
          </md-card-media-actions>
        </md-card>
      </md-content>
    </div>
 </div>
</div>
 
</template>
<script>
import NavBar from '../NavBar.vue'
import { Business } from '../../models/Business';
 export default {
  name: 'CompanyDetails',
  components: {
   NavBar,
  },
  data: () => {
   return {
    company: new Business()
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
          this.company = json.results.filter(company => company.objectId == this.$route.params.id).pop()
    }))
  },
 }
</script>
<style lang="scss" scoped>
  .container-details {
    display: flex;
    flex-direction: column;
  }
  .container-pictures {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
   .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .pictures {
   display: flex;
   flex-direction: row;
   width: 100%;
  }
  .informations {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
</style>

