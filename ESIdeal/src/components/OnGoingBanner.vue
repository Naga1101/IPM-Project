<template>
    <div class="ongoing-part">
        <div class="headers">
            <h1>Serviço a decorrer</h1>
            <Clock class="clock"/>
        </div>
        <div class="opacity">
            <div class="banner" @click="goToPage(servico.id)">
                <div class="rectangle" :class="{'red-rectangle': poucoTempo === true}"></div>
                <div class="info">
                    <div class="left">
                        <span class="descricao">{{servico.def_servico.descricao.toUpperCase()}} (#{{ servico.id }})</span>
                        <span class="duracao">Duração: {{ servico.def_servico.duracao }} min</span>
                    </div>
                    <div class="mid">
                        <span class="prazo" v-if="servico.agendamento === 2" :class="{'red-text': poucoTempo}">PRAZO LIMITE {{ horaFim }} </span>
                    </div>
                    <div class="right">
                        <span class="reminder">CLIQUE AQUI PARA VOLTAR</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Clock from './Clock.vue';

    export default {
        components: {
            Clock
        },
        props: ['servico'],

        data() {
            return {
                horaFim: "",
                poucoTempo: false, // se faltar pouco tempo, fica a cores vermelhas esse elemento
            }
        },

        mounted() {
            if (this.servico.agendamento === 2) {
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
        }
    }
</script>

<style scoped>

    .opacity{
        opacity: 1;
    }

    .banner:hover, .banner:focus {
        opacity: 0.75;
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

    .banner {
        background-color: var(--color-light-grey);
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: var(--color-light-grey);
        flex-direction: row;
        overflow: hidden;
        cursor: pointer;
        min-height: 110px;
    }

    .rectangle {
        background-color: var(--color-darker-grey);    
        width: 45px;
    }

    .red-rectangle{
        background-color: var(--color-red);
    }

    .info {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        font-family: var(--font-family);
        width: 100%;
        padding: 15px 20px;
        line-height: 1.5em;
    }

    .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1.6;
        padding-right: 10px;
    }

    .descricao {
        font-size: 1.2em;
        font-weight: 550;
    }

    .duracao {
        font-size: 1.2em;
        font-weight: 500;
        margin-top: auto;
    }

    .mid {
        display: flex;
        text-align: center;
        flex: 0.5
    }

    .prazo {
        display: flex;
        flex:1;
        font-size: 1.2em;
        font-weight: 400;
        color: var(--text-darker-grey);
        align-items: center;
        justify-content: center;
   }

    .right {
        display: flex;
        align-items: center;
        text-align: center;
        flex: 0.6;
        padding-left: 20px;
        justify-content: right;
    }

    .reminder{
        color: var(--text-darker-grey);
        font-size: 1.3em;
    }

   .red-text{
    color: var(--color-red);
    }

   .mid {
        display: flex;
        flex-direction: column;
        flex: 1;
        font-size: 1em;
        font-weight: 500;
        align-items: center;
   }
    
   @media (max-width: 1080px) { /* tamanho de duas tabelas */

        h1 {
            font-size: 1.6em;
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
            margin: 10px 0px;
            justify-content: space-between
        }
        .clock {
            display: none;
        }

        h1 {
            margin: 0
        }

        .banner {
            min-height: 90px;
            height: fit-content;
            box-sizing: border-box;
            min-width: auto;
        }

        .rectangle {
            width: 40px;
        }
        .clock {
            display: none;
        }

        .mid {
            flex: 0.4
        }

        .right {
            flex: 0.8
        }

        .descricao, .duracao, .prazo, .reminder {
            font-size: 1.2em;
        }
    }

</style>