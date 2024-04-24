<template>
    <div class="opacity">
        <div class="banner" @click="goToPage(servico.id)">
            <div class="rectangle" :class="{'red-rectangle': poucoTempo === true}">
                <object v-if="servico.estado === Consts.EstadoServico.PARADO" class="pause" type="image/svg+xml" data="/svgs/paused.svg" alt="p"></object>
            </div>
            <div class="info">
                <div class="left">
                    <span class="nome">{{ servico.def_servico.descricao.toUpperCase() }} (#{{ servico.id }})</span>
                    <span class="prazo" v-if="servico.agendamento === Consts.AgendamentoServico.PROGRAMADO" :class="{'red-text': poucoTempo}">POR TERMINAR ÀS {{ horaFim }}</span>
                    <span class="prazo" v-else>SEM PRAZO LIMITE</span>
                </div>
                <div class="middle">
                    <span class="duracao">Duração: {{ servico.def_servico.duracao }} min</span>
                    <span class="estado" v-if="servico.estado === Consts.EstadoServico.PARADO" >Estado: Suspenso</span>
                </div>
                <div class="right">
                    <object v-if="(servico.tipos_servico.includes(Consts.TiposVeiculo.GASOLINA) || servico.tipos_servico.includes(Consts.TiposVeiculo.GASOLEO)) && servico.tipos_servico.includes(Consts.TiposVeiculo.ELETRICO)" 
                        class="photo" type="image/svg+xml" data="/svgs/tipos_carro/serv_universal.svg" alt="universal"></object>
                    <object v-else-if="servico.tipos_servico.includes(Consts.TiposVeiculo.GASOLINA) || servico.tipos_servico.includes(Consts.TiposVeiculo.GASOLEO)" class="photo" type="image/svg+xml" data="/svgs/tipos_carro/serv_combustao.svg" alt="combustao"></object>
                    <object v-else-if="servico.tipos_servico.includes(Consts.TiposVeiculo.ELETRICO)" class="photo" type="image/svg+xml" data="/svgs/tipos_carro/serv_eletrico.svg" alt="eletrico"></object>
                </div>
            </div>
        </div>
    </div>
  </template>

  <script>
    import * as Consts from '../models/consts.js';
    import * as ServicesInfo from '../models/ServicesInfo.js';
    import * as DBRequests from '../scripts/DBrequests.js';
    export default {

        props: { // variáveis do componente
            servico: {
                type: Object,
                required: true
            },
            Consts: { // Declare consts as a prop
                type: Object,
                required: true
            },
            ServicesInfo: { // Declare consts as a prop
                type: Object,
                required: true
            }
        },

        data() {
            return {
                horaFim: "",
                poucoTempo: false, // se faltar pouco tempo, fica a cores vermelhas esse elemento
            }
        },

        mounted() {
            if (this.servico.agendamento === Consts.AgendamentoServico.PROGRAMADO) {
                this.calculateTime(this.servico.data)
            }
        },

        methods: {
            calculateTime(dataFim) {
                const horaFim = dataFim.getHours().toString().padStart(2, '0');
                const minutosFim = dataFim.getMinutes().toString().padStart(2, '0');
                this.horaFim = `${horaFim}:${minutosFim}h`;

                const currentTime = new Date();
                const diffMinutes = Math.floor((dataFim - currentTime) / 60000);
                this.poucoTempo = diffMinutes < 60;
            },

            goToPage(serviceId) {
                this.$router.push(`/servico/${serviceId}`);
            }
        },
        watch: {
            limite() { // para dar update visual de limite de tempo de serviço quando se faz sort
                if (servico.agendamento === Consts.AgendamentoServico.PROGRAMADO) {
                    this.calculateTime(servico.data);
                }
            }
        }
    }
</script>

<style scoped>

    .opacity{
        opacity: 1;
    }

    .banner:hover, .banner:focus {
        /* opacity: 0.85;  eu gosto assim mas o pedro quer que se note mais ajustem para o valor que quiserem*/
        opacity: 0.75;
    }

    .banner {
        display: flex;
        height: var(--banner-height);
        min-width: var(--banner-width-min);
        /* width: var(--banner-width-normal); */
        width: 100%;
        background-color: var(--color-light-grey);
        flex-direction: row;
        overflow: hidden;
        cursor: pointer;

    }

    object{
        pointer-events: none; /* permitir clicar no ícone para ativar a on-click function do banner*/
    }

    .rectangle{
        display: flex;
        background-color: var(--color-darker-grey);
        width: 30px;
        height: var(--banner-height);
        align-items: center;
        justify-content: center;
    }

    .pause {
        width: 20px;
    }

    .info {
        display: flex;
        align-items: top;
        justify-content: space-between;
        flex-direction: row;
        font-family: var(--font-family);
        padding: 15px 20px;
        width: 100%;
    }

   .left{
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        flex: 2.4;
        padding: 0px 15px 0px 0px;
   }

   .nome {
        flex:2;
        font-size: 1em;
        font-weight: 500;
        margin-bottom: auto;
        padding-bottom: 5px;
        line-height: 1.3em;
   }

   .prazo {
        display: flex;
        flex:1;
        font-size: 1em;
        font-weight: 400;
        color: var(--text-darker-grey);
        margin-top: auto;
        align-items: flex-end;
   }

   .middle {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 1em;
        font-weight: 500;
   }

   .duracao {
        margin-bottom: auto;
   }

   .right {
        flex: 0.1;
        display: flex;
        justify-content: right;
        align-items: center;
   }

   .estado{
        color: var(--text-light-grey);
   }

   .photo {
        padding: 0px 0px 0px 20px;
        height: 85%;
        width: auto;
   }

   /*classes para mudar dinamicamente cor de componentes*/
   .red-rectangle{
        background-color: var(--color-red);
   }

   .red-text{
        color: var(--color-red);
   }

</style>