<template>
    <Navbar/>
    <div class="page">
        <div class="headers">
            <h1>Serviços agendados</h1>
            <Clock class="clock"/>
        </div>
        <div class="tables">
            <TabelaServicos class="table_entry1" :services="serviceData"/>
            <div class="separator"></div>
            <TabelaServicos class="table_entry2" :services="serviceData"/>
        </div>
    </div>
    <Footer/>
  </template>
  
  <script>
    import TabelaServicos from './TabelaServicos.vue';
    import Clock from './Clock.vue';
    export default {
        components: {
            TabelaServicos,
            Clock
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
        padding: 10px 50px 0px 50px;
    }

    .headers {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        padding-bottom: 5px;

    }
    h1 {
        font-size: 40px;
        font-weight: 500;
        font-family: var(--font-family);
    }

    .clock {
        position: relative;
        top: -5px;
    }
    
    .tables {
        display: flex;
        flex-direction: row;
    }

    .table_entry1 {
        padding-right: 30px;
    }

    .table_entry2 {
        padding-left: 20px;
        padding-right: 10px;
    }

    .separator {
        position: static;
        left: 50%;
        width: 1px;
        background-color: var(--text-light-grey);
        transform: translateX(-50%);
    }

    @media (max-width: 1055px) { /* tamanho de duas tabelas */
        .tables {
            flex-direction: column;
            flex-wrap: row-wrap;
        }

        .table_entry1, .table_entry2 {
            padding-left:0px;
            height: calc(var(--banner-height) * 3.4);
            padding-bottom: 20px;
        }

        .separator {
            display: none;
        }
    }

</style>