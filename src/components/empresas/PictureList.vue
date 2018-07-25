<template>
  <div class="lista-picture">
     <md-list>
      <md-list-item v-for="picture in form.pictures" v-bind:key="picture">
        {{ picture }} <span v-on:click="removePicture()"><md-icon >delete_forever</md-icon></span>
      </md-list-item>
     </md-list>
   </div> 
</template>
<script>
 export default {
  name: 'PictureList',
  props: ['listPicture'],
  data: () => {
   return {

   }
  },
  methods: {
    addPictures () {
      this.form.pictures.push(this.picture);
    },
    removePicture () {

    },
  }
 }
</script>
<style>

</style>

