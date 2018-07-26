<template>
 <div>
  <NavBar></NavBar> 
     <md-card
      class=""
      v-for="picture in company[0].pictures" v-bind:key="picture">
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

  <p>{{company[0].name}}</p>
  <p>{{company[0].address}}</p>
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
  created () {
   fetch('https://parseapi.back4app.com/classes/Company/', {
      method: 'get',
      headers: {         
        "X-Parse-Application-Id": "JPdleQSgMjUF06VvAPfjPb6tyPwnDpepAeTEtBYL",         
        "X-Parse-REST-API-Key": "eQM22TzI3BwImu6IVKXOeFei2NTLV6StBQvsUVJG"     
      },
    } 
    ).then(response => 
        response.json().then(json => {
          this.company = json.results
          console.log(json.results)
    }))
  },
  computed: {
   get: function () {
    this.company = this.company.filter(company => company.objectId == this.$route.params.id)
   }
  }
 }
</script>
<style lang="scss" scoped>
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
</style>

