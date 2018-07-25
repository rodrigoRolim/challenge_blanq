<template>
<div>
    <router-view></router-view>
</div>

</template>

<script>
import EmpresaLista from './components/empresas/EmpresaLista.vue'
export default {
  name: 'app',
  components: {
   EmpresaLista
  },
  data() {
    return {
      message: 'Hello, Vue!'
    };
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
