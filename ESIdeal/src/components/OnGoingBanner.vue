<template>
    <div class="ongoing-part">
        <div class="headers">
            <h1>Serviço a decorrer</h1>
            <Clock class="clock"/>
        </div>
        <div class="banner">
            <div class="rectangle"></div>
            <div class="info">
                <div class="left">
                    <span class="descricao">{{servico.def_servico.descricao}}</span>
                    <span class="id">(#{{ servico.id }})</span>
                    <span class="duracao">Duração: {{ servico.def_servico.duracao }} min</span>
                </div>
                <div class="right">
                    <span class="estado">ESTADO: {{ servico.estado }}</span>
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
        props: ['servico']
    }
</script>

<style scoped>

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
    }

    .rectangle {
        background-color: var(--color-darker-grey);    
        width: 45px;
        height: 110px;
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

    .right {
        display: flex;
        flex-direction: column;
        justify-content: right;
        padding: 20px 50px 0px 0px
    }

    .estado {
        font-size: 25px;
        font-weight: 550;
    }

    .duracao {
        font-size: 18px;
        font-weight: 500;
        padding-top: 15px;
    }
    
</style>