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
                        <span class="descricao">{{servico.def_servico.descricao}}</span>
                        <span class="id">(#{{ servico.id }})</span>
                        <span class="duracao">Duração: {{ servico.def_servico.duracao }} min</span>
                    </div>
                    <div class="mid">
                        <span class="prazo" v-if="servico.agendamento === 2" :class="{'red-text': poucoTempo === true}">PRAZO LIMITE</span>
                        <span class="prazo" v-if="servico.agendamento === 2" :class="{'red-text': poucoTempo}">{{ horaFim }}</span>
                    </div>
                    <div class="right">
                        <span class="reminder">CLIQUE AQUI PARA</span>
                        <span class="reminder">VOLTAR</span>
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
        opacity: 0.05;
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
        width: 95vw;
        background-color: var(--color-light-grey);
        flex-direction: row;
        overflow: hidden;
        cursor: pointer;
    }

    .rectangle {
        background-color: var(--color-darker-grey);    
        width: 45px;
        height: 110px;
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
    }

    .left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 10px 0px 0px 15px
    }

    .descricao {
        font-size: 30px;
        font-weight: 550;
    }

    .id {
        font-size: 20px;
        font-weight: 500;
    }

    .reminder{
        color: var(--text-darker-grey);
        font-size: 1.875em;
    }

    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: right;
        padding: 20px 50px 0px 0px
    }

    .duracao {
        font-size: 18px;
        font-weight: 500;
        padding-top: 15px;
    }

    .prazo {
        display: flex;
        flex:1;
        font-size: 1.56em;
        font-weight: 400;
        color: var(--text-darker-grey);
        margin-top: auto;
        align-items: center;
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
    
</style>