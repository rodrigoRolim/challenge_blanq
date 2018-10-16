<template>
<div>
    <router-view></router-view>
</div>

</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    teste () {
      return "boo"
    }
  }
};
</script>
<style lang="scss" scoped>
 $font-stack:    Helvetica, sans-serif;
 $display-flex: flex;

 body {
  font: 100% $font-stack;
 }
 .container-root {
   padding: 100px 0;
   display: $display-flex;
   flex-direction: column;
 }
</style>
