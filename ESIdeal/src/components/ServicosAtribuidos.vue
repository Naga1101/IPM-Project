<template>
    <Navbar/>
    <div class="page">
        <div class="headers">
            <h1>Serviços agendados</h1>
            <Clock class="clock"/>
        </div>
        <div class="tables">
            <TabelaServicos class="table_entry1" :services="categorias.comPrazo" :comPrazo="true"/>
            <!-- <div class="separator"></div> -->
            <TabelaServicos class="table_entry2" :services="categorias.semPrazo" :comPrazo="false"/>
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
                        id: 1231,
                        tipo: "gasolina",
                        descricao: "MUDANÇA DE ÓLEO DOS PNEUS ENTRE OUTRAS DESCRICÕES GRANDES",
                        estado: "nafila",
                        duracao: 60,
                        limite: new Date( new Date().getTime() + 60 * 60000)
                    },
                    {
                        id: 2,
                        descricao: "Service 2",
                        tipo: "eletrico",
                        estado: "nafila",
                        duracao: 120,
                        limite: null
                    },
                    {
                        id: 3,
                        descricao: "Service 3",
                        tipo: "universal",
                        estado: "nafila",
                        duracao: 30,
                        limite: new Date( new Date().getTime() + 30 * 60000)
                    },
                    {
                        id: 4,
                        descricao: "Service 4",
                        tipo: "gasoleo",
                        estado: "parado",
                        duracao: 75,
                        limite: new Date( new Date().getTime() + 75 * 60000)
                    },
                    {
                        id: 5,
                        descricao: "Service 5",
                        tipo: "eletrico",
                        estado: "parado",
                        duracao: 90,
                        limite: new Date( new Date().getTime() + 90 * 60000)
                    },
                    {
                        id: 6,
                        descricao: "Service 6",
                        tipo: "eletrico",
                        estado: "parado",
                        duracao: 120,
                        limite: new Date( new Date().getTime() + 120 * 60000)
                    },
                    {
                        id: 7,
                        descricao: "Service 7",
                        tipo: "gasolina",
                        estado: "nafila",
                        duracao: 30,
                        limite: null
                    },
                    {
                        id: 8,
                        descricao: "Service 8",
                        tipo: "gasoleo",
                        estado: "parado",
                        duracao: 45,
                        limite: new Date( new Date().getTime() + 45 * 60000)
                    },
                    {
                        id: 9,
                        descricao: "Service 9",
                        tipo: "gasolina",
                        estado: "nafila",
                        duracao: 1,
                        limite: new Date(new Date().getTime() + 120 * 60000)
                    },
                    {
                        id: 10,
                        descricao: "Service 10",
                        tipo: "gasolina",
                        estado: "nafila",
                        duracao: 1,
                        limite: null
                    }
                ]
            };
        },
        computed: {
            categorias: function() { // dividr serviços em "com prazo limite" e "sem prazo limite"
                const categorias = {
                    comPrazo: [],
                    semPrazo: []
                }

                this.serviceData.forEach(service => {
                    if (service.limite !== null) {
                        categorias.comPrazo.push(service)
                    } 
                    else {
                        categorias.semPrazo.push(service)
                    }
                })

                return categorias;
            }
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
        font-size: 2.2em;
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
        height: 70vh;
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

    @media (max-width: 1080px) { /* tamanho de duas tabelas */
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