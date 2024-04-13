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
                duracao: 60,

                //temp
                matricula: "13-AB-12",
                marca: "Toyota",
                modelo: "Prius",
                cilindrada: "1.8L",
                potencia: "3.3W",
                medidasJantes: "17",
                tipoMotor: "Híbrido",

                nomecliente: "Felizberto Tristemundo",
                contacto: "+351 938 123 524"

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
        
        <!-- Banner -->
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
            <!-- Car info -->
            <div class="car-details">
                <span class="veiculo"> Veículo </span>
                <span class="car-info"> Matricula: {{ matricula }} </span>
                <span class="car-info"> Marca: {{ marca }} </span>
                <span class="car-info"> Modelo: {{ modelo }} </span>
                <span class="car-info"> Cilindrada: {{ cilindrada }} </span>
                <span class="car-info"> Potência do carregador: {{ potencia }}</span>
                <span class="car-info"> Medidas Jantes: {{ medidasJantes }}</span>
            </div>

            <!-- Motor info -->
            <div class="motor">
                <span class="tipo-motor"> Tipo de Motor: {{ tipoMotor }}</span>
                <!-- depois meter as condições-->
                <div class="motor-imgs">
                    <img src="/images/combustao_naoselected.png" alt="carbackground">
                    <img src="/images/eletrico_naoselected.png" alt="carbackground">
                </div>
            </div>

            <div class="separator"></div>

            <!-- Client Info-->
            <div class="cliente">
                <div class="cliente-title"> Cliente </div>
                <span class="client-info"> Nome: {{ nomecliente }}</span>
                <span class="client-info"> Contanto: {{ contacto }}</span>
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
        padding: 0px 50px 0px 50px;
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
    
    .details {
        display: flex;
        flex-direction: row;
        padding: 40px 0px 0px 80px;
    }

    .car-details {
        display: flex;
        flex-direction: column;
    }

    .veiculo {
        font-size: 25px;
        padding-bottom: 20px;
    }

    .car-info, .client-info  {
        padding-bottom: 15px;
        font-size: 20px;
    }

    .motor {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0px 0px 70px
    }

    .tipo-motor {
        font-size: 20px;
        padding-bottom: 10px;
    }

    .motor-imgs {
        display: flex;
        padding-left: 50px;
        gap: 25px
    }

    .motor-imgs img{
        width: 60px;
        height: auto;
    }

    .separator {
        margin-left: 30px;
        margin-right: 30px;
        width: 2px;
        height: 32vh;
        align-items: stretch;
        background-color: rgb(194, 181, 181);
    }

    .cliente {
        display: flex;
        flex-direction: column;
    }

    .cliente-title {
        font-size: 25px;
        padding-bottom: 20px;
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