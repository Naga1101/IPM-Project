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
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-red);
    color: white;
    min-width: calc(var(--banner-width-min) - 30px);
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
    width: 100%;
    height: var(--table-height);

  }

  .service{
    margin-bottom: 10px;
    width: 100%;
  }

  /* customizar a scrollbar */
  .table-main::-webkit-scrollbar {
    width: 12px;
  }

  .table-main::-webkit-scrollbar-thumb {
    background-color: #949494;
    border-radius: 10px;
  }

  .table-main::-webkit-scrollbar-track {
    background-color: #E2E2E2;
  }
</style>