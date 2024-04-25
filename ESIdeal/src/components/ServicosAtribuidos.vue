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
    import * as Consts from '../models/consts.js';

    export default {
        components: {
            Clock,
            OnGoingBanner,
            TabelaServicos,
            Help
        },

        setup() {
            const store = serviceState(); // Access the Pinia store

            const services = store.servicesToComplete; // Access services from the store

            const onGoingService = store.onGoingService; // Access onGoingService from the store

            const categorias = {
                comPrazo: [],
                semPrazo: []
            };

            // Compute categorias based on services
            services.forEach(service => {
                if (service.agendamento === Consts.AgendamentoServico.PROGRAMADO) {
                    categorias.comPrazo.push(service);
                } else {
                    categorias.semPrazo.push(service);
                }
            });

            return {
                services,
                onGoingService,
                categorias
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