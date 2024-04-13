<script>
    import Navbar from './Navbar.vue';
    import Clock from './Clock.vue';

    export default {
        components: {
            Navbar,
            Clock
        },
        data() {
            return {
                id: 1,
                descricao: "Service 1",
                estado: "POR INICIAR",
                duracao: 60
            }
        },
        
    };
 </script>

<template>
    <Navbar/>
    <div class="page">
        <div class="header">
            <h1>Detalhes de serviço</h1>
            <Clock class="clock"/>
        </div>

        <div class="banner">
            <div class="rectangle"></div>
            <div class="info">
                <div class="left">
                    <span class="descricao">{{ descricao }}</span>
                    <span class="id">(#{{ id }})</span>
                    <span class="duracao">Duração: {{ duracao }} min</span>
                </div>
                <div class="right">
                    <span class="estado">ESTADO: {{ estado }}</span>
                </div>
            </div>
        </div>

        <div class="details">
            <div class="car-details">
                <span> Matricula: {{ matricula }} </span>
                <span> Marca: {{ marca }} </span>
                <span> Modelo: {{ modelo }} </span>
                <span> Cilindrada: {{ cilindrada }} </span>
                <span> Potência do carregador: {{ potencia }}</span>
                <span> Medidas Jantes: {{ medidasJantes }}</span>
            </div>

        </div>
    </div>
</template>

<style scoped>
    
    .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px 40px 0px 40px;
    }

    .info {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        font-family: var(--font-family);
        width: 100%;
    }

    .banner {
        background-color: var(--color-light-grey);
        display: flex;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
        width: 95vw;
    }

    .rectangle {
        display: flex;
        background-color: var(--color-darker-grey);    
        width: 45px;
        height: 110px;
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
        display: flex;
        font-size: 18px;
        font-weight: 500;
        padding-top: 15px;
    }

</style>




<!--
<template>
    <h1>Servico especifico page</h1>
    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?"></iframe>
</template>

<script>
export default {
    inheritAttrs: false,
}
</script>

<style scoped>
iframe {
    height:90vh;
    width: 100%;
}
</style>
-->