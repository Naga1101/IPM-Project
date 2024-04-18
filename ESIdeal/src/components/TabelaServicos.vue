<template>
  <div class="table-main">
    <div class="table-header" :class="{'red-table-header': comPrazo }">
      <span class="header-text">{{ comPrazo ? 'COM PRAZO LIMITE' : 'SEM PRAZO LIMITE'}}</span>
      <!-- considerar meter os botoes de ordenar e filtrar num componente separado?? -->
      <div class="dropdowns">
        <!-- filtrar dropdown -->
        <div class="filtrar-dropdown">
          <button class="dropdown-button" @click="toggleFiltrarDropdown">FILTRAR
            <object class="dropdown-arrow" type="image/svg+xml" data="/svgs/filtrar_arrow.svg"></object>
          </button>
          <div class="dropdown-content" :class="{ 'show-dropdown': dropdownFiltroVisible }">
            <button v-for="(option,index) in dropdownFiltrarOptions" :class="{ 
              'dropdown-elem': true,
              'dropdown-elem-red': index === filtroSelecionado && comPrazo,
              'dropdown-elem-black': index === filtroSelecionado && !comPrazo
            }"
            @click="applyFiltrarFunc(index,option.function)"> {{ option.title }}</button>
          </div>
        </div>
        <!-- ordenar dropdown -->
        <div class="ordenar-dropdown">
          <button class="dropdown-button" @click="toggleOrdenarDropdown">ORDENAR
            <object class="dropdown-arrow" type="image/svg+xml" data="/svgs/filtrar_arrow.svg"></object>
          </button>
          <div class="dropdown-content" :class="{ 'show-dropdown': dropdownOrdenarVisible }">
            <template v-for="(option,index) in dropdownOrdenarOptions">
              <button v-if="!('optional' in option) || comPrazo" :class="{ 
                'dropdown-elem': true,
                'dropdown-elem-red': index === ordenarSelecionado && comPrazo,
                'dropdown-elem-black': index === ordenarSelecionado && !comPrazo
              }"
              @click="applyOrdenarFunc(index,option.function)"> {{ option.title }}
            </button>
          </template>
          </div>
        </div>

      </div>
    </div>
    <div class="table-content">
      <div v-for="(service,index) in servicesToPresent" :key="index" class="service">
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
      dropdownOrdenarOptions: [ // títulos e funções a chamar para cada botão
        { "title": "Ordem de chegada", "function": "sortNone"},
        { "title": "Ordem crescente de duração", "function": "sortByCrescDuration"},
        { "title": "Ordem decrescente de duração", "function": "sortByDecresDuration"},
        { "title": "Proximidade da data limite", "function": "sortByProxLimit", "optional": true} // não é para aparecer na tabela de "sem limite"
        // { "title": "Ordem decrescente de chegada??", "function": "sortByCrescente"},
      ],
      dropdownFiltrarOptions: [ // títulos e funções a chamar para cada botão

        { "title": "Sem filtro", "function": "filterNone"},
        { "title": "Serviços suspensos", "function": "filterSuspended"},
        { "title": "Serviços combustão", "function": "filterCombustion"},
        { "title": "Serviços elétricos", "function": "filterEletric"},
        { "title": "Serviços universais", "function": "filterUniversal"}
      ],
      dropdownOrdenarVisible: false, // para gerir se dropdown é ou não visível
      dropdownFiltroVisible: false, // para gerir se dropdown é ou não visível
      filtroSelecionado: 0, // posição do elemento dentro da div do dropdown-cotent
      ordenarSelecionado: 0,
      servicesToPresent: []
    }
  },
  methods: {
    toggleOrdenarDropdown() {
      // find dropdown content element
      this.dropdownOrdenarVisible = !this.dropdownOrdenarVisible;
      this.dropdownFiltroVisible = false
    },
    toggleFiltrarDropdown() {
      // find dropdown content element
      this.dropdownFiltroVisible = !this.dropdownFiltroVisible;
      this.dropdownOrdenarVisible = false
    },

    applyOrdenarFunc(index, func) {
      this.ordenarSelecionado = index;
      this[func]() // correr a função correspondente
      this.dropdownOrdenarVisible = false // fechar o dropdown por conveniencia
    },
    applyFiltrarFunc(index,func) {
      this.filtroSelecionado = index;
      this[func]() // correr a função de filter correspondente  
      const currOrdFunc = this.dropdownOrdenarOptions[this.ordenarSelecionado].function
      this[currOrdFunc]() // correr a função de ordenar correpsondente, sobre dados filtrados
      this.dropdownFiltroVisible = false // fechar o dropdown por conveniencia
    },

    sortNone() {
      this.servicesToPresent.sort((a,b) => a.id - b.id)
    },
    //funções de ORDENAR
    sortByCrescDuration() {
      this.servicesToPresent.sort((a,b) => a.duracao - b.duracao)
    },

    sortByDecresDuration() {
      this.servicesToPresent.sort((a,b) => b.duracao - a.duracao)
    },
    sortByProxLimit() {
      this.servicesToPresent.sort((a, b) => a.limite - b.limite);
    },

    // funções de FILTER
    filterNone() {
      this.servicesToPresent = this.services
    },
    filterSuspended() {
      this.servicesToPresent = this.services.filter(service => service.estado === 'parado');
    },
    filterCombustion() {
      this.servicesToPresent = this.services.filter(service => service.tipo === 'gasolina' || service.tipo === 'gasoleo');
    },
    filterEletric() {
      this.servicesToPresent = this.services.filter(service => service.tipo === 'eletrico');
    },
    filterUniversal() {
      this.servicesToPresent = this.services.filter(service => service.tipo === 'universal');
    }
  },

  created() {
    this.servicesToPresent = this.services
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
    font-size: 0.9em;
    font-weight: 400;
  }
  
  .ordenar-dropdown, .filtrar-dropdown {
    float: right;
    position: relative;
    margin-left: 15px;
  }

  .dropdown-button {
    background-color:  rgba(255, 255, 255,0);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 400;
    padding: 2px 5px;
  }

  .dropdown-arrow{
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
    width: 25vw;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    right: 0;
    translate: 5px 5px;
  }

  .dropdown-elem {
    color: var(--text-black);
    align-items: center;
    text-align: left;
    padding: 4px 10px;
    background-color: var(--color-very-light-grey);
    font-size: 18px;
    font-weight: 300;
    min-height: 30px;
    height: fit-content;
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

  .dropdown-elem-black {
    background-color: var(--color-table-black);
  }

  .dropdown-elem-red {
    background-color: var(--color-red);
  }

</style>