<template>
<div>
  <h1>{{ message }}</h1>
  <ComponentA></ComponentA>
</div>
 
</template>

<script>
import ComponentA from './components/componentA.vue';
export default {
  name: 'app',
  components: {
   ComponentA
  },
  data() {
    return {
      message: 'Hello, Vue!'
    };
  }
};
</script>
<style lang="scss">
 $font-stack:    Helvetica, sans-serif;
 $primary-color: rgb(194, 2, 2);

 body {
  font: 100% $font-stack;
  color: $primary-color;
 }
</style>
