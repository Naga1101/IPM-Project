<template>
  <router-view></router-view>
</template>

<script>
import { serviceState } from './scripts/stores.js';

  export default {
    async created() {
      const serviceStateData = serviceState()
      await serviceStateData.loadDBdata(); // carregar dados da base de dados ao iniciar o programa
    }
  }

</script>
<style scoped>
</style>
