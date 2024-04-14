<template>
  <div class="table-main">
    <div class="table-header" :class="{'red-table-header': comPrazo }">
      <span class="header-text">{{ comPrazo ? 'COM PRAZO LIMITE' : 'SEM PRAZO LIMITE'}}</span>
      <div class="filtrar-dropdown">
        <button class="dropdown-button" @click="toggleDropdown">FILTRAR
          <object class="filtrar-arrow" type="image/svg+xml" data="/svgs/filtrar_arrow.svg"></object>
        </button>
        <div class="dropdown-content" :class="{ 'show-dropdown': dropdownVisible }">
          <button class="dropdown-elem">Ordem crescente</button>
          <button class="dropdown-elem">Ordem decrescente</button>
          <button class="dropdown-elem">Proximidade de data limite</button>
          <button class="dropdown-elem">Serviços suspensos</button>
        </div>
      </div>
    </div>
    <div class="table-content">
      <div v-for="(service,index) in services" :key="index" class="service">
        <ServicoBanner :id="service.id" :tipo="service.tipo" :descricao="service.descricao" :estado="service.estado" :duracao="service.duracao" :limite="service.limite"/>
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
    },
    comPrazo: {
      type: Boolean,
      required: true
    }
  },
  props: ['services', 'comPrazo'],
  data() {
    return {
      dropdownVisible: false, // para gerir se dropdown é ou não visível
      filtroSelecionado: "0" // posição do elemento dentro da div do dropdown-cotent
    }
  },
  methods: {
    toggleDropdown() {
      // find dropdown content element
      this.dropdownVisible = !this.dropdownVisible;
    }
  }
}

</script>

<style scoped>

  .table-main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-table-black);
    color: white;
    min-width: calc(var(--banner-width-min) - 30px);
    width: calc(100% - 31px); /* porque é só está direito quando é especificamente 41.5???*/
    min-height: 30px;
    font-family: var(--font-family);
    padding: 0px 5px 0px 15px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }
  
  .filtrar-dropdown {
    float: right;
    position: relative;
  }

  .dropdown-button {
    background-color:  rgba(255, 255, 255,0);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 400;
    padding: 2px 5px;
  }

  .filtrar-arrow{
    width: 18px;
    padding-left: 10px;
    translate: 0px 1px;
    pointer-events: none;
  }

  .dropdown-button:hover, .dropdown-button:focus {
    background-color: rgba(255,255,255,0.3);
  }

  .dropdown-content {
    display: none; /* por default não aparece */
    position: absolute;
    background-color: var(--color-light-grey);
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0;
    translate: 5px 5px;
}

  .dropdown-elem {
    color: var(--text-black);
    align-items: center;
    text-align: left;
    padding: 0px 10px;
    background-color: var(--color-very-light-grey);
    font-size: 18px;
    height: 30px;
    width: 100%;
    display: block;
  }

  .dropdown-elem:not(:last-child) {
    border: solid;
    border-width: 1px 1px 0px 1px;
    border-color: var(--text-light-grey);
  }

  .dropdown-elem:last-child {
    border: solid;
    border-width: 1px;
    border-color: var(--text-light-grey);
  }

  .dropdown-elem:hover {
    background-color: rgba(255,255,255,0.6);
  }

  .table-content {
    overflow-y: scroll;
    width: 100%;
    /* height: 65vh; */
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

  /*classes para assign dinâmico*/
  .red-table-header {
    background-color: var(--color-red);
  }

  .show-dropdown {
    display:block;
  }

</style>