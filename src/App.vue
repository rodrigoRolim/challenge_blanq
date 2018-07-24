<template>
<div class="container-root">
  <empresa-lista></empresa-lista>
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
<style lang="scss">
 $font-stack:    Helvetica, sans-serif;
 $display-flex: flex;

 body {
  font: 100% $font-stack;
 }
 .container-root {
   display: $display-flex;
   flex-direction: column;
 }
</style>
