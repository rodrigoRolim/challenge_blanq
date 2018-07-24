<template>
<div>
  <empresa-lista></empresa-lista>
</div>
 
</template>

<script>
import EmpresaLista from './components/empresas/EmpresaLista.vue'
export default {
  name: 'app',
  components: {
   ComponentA,
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
 $primary-color: rgb(68, 67, 67);

 body {
  font: 100% $font-stack;
  color: $primary-color;
 }
</style>
