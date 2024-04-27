<template>
    <Navbar/>
    <div v-if="services" class="page">
        <OnGoingBanner v-if="onGoingService" class="ongoing-banner" :servico="onGoingService"/>
        <div class="headers">
            <div class="title">
                <h1>Serviços agendados</h1>
                <Help hoverIMG="/images/helpbox.png" />
            </div>
            <Clock v-if="!onGoingService" class="clock"/>
        </div>
        <div class="tables">
            <TabelaServicos class="table_entry1" :services="categorias.comPrazo" :comPrazo="true"/>
            <!-- <div class="separator"></div> -->
            <TabelaServicos class="table_entry2" :services="categorias.semPrazo" :comPrazo="false"/>
        </div>
    </div>
    <LoadingPage v-else/>
    <Footer/>
  </template>
  
  <script>
    import TabelaServicos from './TabelaServicos.vue';
    import OnGoingBanner from './OnGoingBanner.vue';
    import Help from './Help.vue';
    import Clock from './Clock.vue';
    import {serviceState} from '../scripts/stores.js';
    import { userState } from '../scripts/stores.js';
    import * as Consts from '../models/consts.js';

    export default {
        components: {
            Clock,
            OnGoingBanner,
            TabelaServicos,
            Help
        },

        data() {
            return {
                store: serviceState(), // Access the Pinia store
                user: userState(),
            }
        },
        
        mounted() {
            this.checkUser();
        },

        methods: {
            checkUser() {
                if (!this.user.userId) {
                    this.$router.push('/login');
                }
            }
        },

        computed: {
            onGoingService() {
                return this.store.onGoingService
            },
            services() {
                return this.store.servicesToComplete
            },
            categorias() {
                const categorias = {
                    comPrazo: [],
                    semPrazo: []
                };

                // Compute categorias based on services
                this.services.forEach(service => {
                    if (service.agendamento === Consts.AgendamentoServico.PROGRAMADO) {
                        categorias.comPrazo.push(service);
                    } else {
                        categorias.semPrazo.push(service);
                    }
                });
                
                return categorias
            }
        }
    };

 </script>

<style scoped>

    .page {
        padding: 10px 50px 0px 50px;
        box-sizing: border-box;
    }

    .headers {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-right: 20px;
        padding-bottom: 5px;

    }

    .title{
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 20px;
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

        h1 {
            font-size: 1.6em;
        }
        
        .table_entry1, .table_entry2 {
            padding-left:0px;
            max-height: calc(var(--banner-height) * 3.4);
            padding-bottom: 20px;
        }

        .separator {
            display: none;
        }
    }

    
   @media (max-width: 700px) {
        .page {
            font-size: 0.8em;
            padding: 15px;
            min-height: 200px;
        }

        .headers {
            align-items: center;
            margin-bottom: 10px;
            justify-content: space-between
        }
        .clock {
            display: none;
        }

        h1 {
            margin: 0
        }
    }

</style>