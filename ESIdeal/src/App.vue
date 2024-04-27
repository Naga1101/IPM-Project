<template>
  <router-view :key="$route.fullPath"></router-view> <!-- forçar componentes a ser destruídos e recriados, para poder mudar de serviço no histórico de um serviço -->
  <!-- <Footer/> -->
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
