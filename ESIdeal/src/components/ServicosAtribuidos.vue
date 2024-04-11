<template>
    <Navbar />
    <div>
      <h1>Serviços Atribuídos</h1>
      <ServicoBanner :id="id" :descricao="descricao" :estado="estado" :duracao="duracao"/>
    </div>
  </template>
  
  <script>
  import ServicoBanner from './ServicoBanner.vue';
  
  export default {
    components: {
        ServicoBanner
    },
    data() {
        return {
            id: 12923,
            descricao: "Descrição de teste substituição dos filtros".toUpperCase(),
            estado: "Por Realizar",
            duracao: 60
        };
    },
    props: ['services', 'serviceDefinitions']
  };
  </script>