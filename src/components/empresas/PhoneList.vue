<template>
  <div class="lista-phone">
     <md-list>
      <md-list-item v-for="phone in form.phones" v-bind:key="phone">
        {{ phone }} <span v-on:click="removePhone(phone)"><md-icon >delete_forever</md-icon></span>
        </md-list-item>
     </md-list>
   </div> 
</template>
<script>
 export default {
  props: ['phoneList'],
  name: 'PhoneList',
  data: () => {
   return {

   }
  }
 }
</script>
<style>

</style>
