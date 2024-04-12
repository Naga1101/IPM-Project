<template>
  <div class="table-main">
    <div class="table-header">
      <span class="header-text">COM PRAZO LIMITE</span>
      <div class="filtrar-botao">
        <span class="filtrar-text">FILTRAR</span>
        <object class="filtrar-arrow" type="image/svg+xml" data="/svgs/filtrar_arrow.svg"></object>
      </div>
    </div>
    <div class="table-content">
      <div v-for="(service,index) in services" :key="index" class="service">
        <ServicoBanner :id="service.id" :descricao="service.descricao" :estado="service.estado" :duracao="service.duracao" />
      </div>
    </div>
  </div>
</template>
  
<script>
import ServicoBanner from './ServicoBanner.vue';

export default {
  components: {
      ServicoBanner
  },
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  props: ['services', 'serviceDefinitions']
};
</script>

<style scoped>

  .table-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 100%;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-red);
    color: white;
    min-width: calc(var(--banner-width-min) - 30px);
    padding-right: 15px;
    width: calc(100% - 41px); /* porque é só está direito quando é especificamente 41.5???*/
    height: 20px;
    font-family: var(--font-family);
    padding: 5px 15px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }

  .filtrar-arrow{
    width: 18px;
    padding-left: 10px;
    translate: 0px 1px;
  }
  
  .table-content {
    overflow-y: scroll;
    width: 100%;
    height: 65vh;
    padding-right: 15px;
  }

  .service:not(:last-child) { /* todos os elementos menos o último da lista ficam com espaço em baixo */
    margin-bottom: 10px;
  }

  /* customizar a scrollbar */
  .table-content::-webkit-scrollbar {
    width: 12px;
  }

  .table-content::-webkit-scrollbar-thumb {
    background-color: #949494;
    border-radius: 10px;
  }

  .table-content::-webkit-scrollbar-track {
    background-color: #E2E2E2;
  }
</style>