<template>
    <Navbar/>
    <div class="page">
        <h1>Serviços Atribuídos</h1>
        <div class="tables">
            <TabelaServicos class="table_entry" :services="serviceData"/>
            <TabelaServicos class="table_entry" :services="serviceData"/>
        </div>
    </div>
  </template>
  
  <script>
    import Navbar from './Navbar.vue';
    import TabelaServicos from './TabelaServicos.vue';
    
    export default {
        components: {
            Navbar,
            TabelaServicos
        },
        props: ['services', 'serviceDefinitions'],
        data() {
            return {
                serviceData: [
                    //Exemplos de servicos
                    {
                        id: 1,
                        descricao: "Service 1",
                        estado: "Por Realizar",
                        duracao: 60
                    },
                    {
                        id: 2,
                        descricao: "Service 2",
                        estado: "Realizado",
                        duracao: 45
                    },
                    {
                        id: 3,
                        descricao: "Service 3",
                        estado: "Por Realizar",
                        duracao: 30
                    },
                    {
                        id: 4,
                        descricao: "Service 4",
                        estado: "Realizado",
                        duracao: 75
                    },
                    {
                        id: 5,
                        descricao: "Service 5",
                        estado: "Por Realizar",
                        duracao: 90
                    },
                    {
                        id: 6,
                        descricao: "Service 6",
                        estado: "Realizado",
                        duracao: 120
                    },
                    {
                        id: 7,
                        descricao: "Service 7",
                        estado: "Realizado",
                        duracao: 120
                    },
                    {
                        id: 8,
                        descricao: "Service 8",
                        estado: "Realizado",
                        duracao: 120
                    },
                    {
                        id: 9,
                        descricao: "Service 9",
                        estado: "Realizado",
                        duracao: 120
                    }
                ]
            };
        }
    };
 </script>

<style scoped>
    .page {
        padding: 20px
    }
    .tables {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
    .table_entry {
       padding: 0px 30px;
       width: 100%;
    }
</style>