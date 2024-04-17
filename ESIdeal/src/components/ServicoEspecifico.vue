<script>
	import Modal from './Modal.vue';
    import Navbar from './Navbar.vue';
    import Clock from './Clock.vue';

    export default {
        components: {
            Navbar,
            Clock,
			Modal
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
                contacto: "+351 938 123 524",

                historicoServicos: [
                    { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                    { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                    { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                    { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                    { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                    { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                    { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                    { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                    { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                    { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                    { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                    { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" }
                ],

				mostrarMenuConcluir: false
            }
        },
		methods: {
			showModal() {
				this.mostrarMenuConcluir = true;
			},
			closeModal() {
				this.mostrarMenuConcluir = false;
			}
		}
       
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
                    <img src="/images/combustao_naoselected.png" alt="combustao">
                    <img src="/images/eletrico_naoselected.png" alt="eletrico">
                </div>
            </div>

            <div class="separator"></div>

            <!-- Client Info-->
            <div class="cliente">
                <div class="cliente-title"> Cliente </div>
                <span class="client-info"> Nome: {{ nomecliente }}</span>
                <span class="client-info"> Contanto: {{ contacto }}</span>
            </div>

            <div class="separator"></div>

            <!-- Butoes -->
            <div class="btns">
                <button class="service-btn">
                    INICIAR
                    <object class="right-arrow" type="image/svg+xml" data="/svgs/Vector.svg"></object>
                </button>
            </div>
        </div>
        
        <!-- Tabela de serviços anteriores -->
        <div class="table">
            <div class="table-container">
                <div class="table-header">
                    <span>HISTÓRICO DE SERVIÇOS DO CARRO</span>
                </div>
                <div class="table-services">
                    <table>
                        <thead>
                            <tr>
                                <th>Serviço</th>
                                <th>Estado</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(service, index) in historicoServicos" :key="index">
                                <td>{{ service.servico }}</td>
                                <td>{{ service.estado }}</td>
                                <td>{{ service.data }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		<button v-show="! mostrarMenuConcluir" @click="showModal" class="floating-button">
            CONCLUIR
            <img src="/images/left_arrow.png" alt="arrow">
        </button>
		<Modal v-show="mostrarMenuConcluir" @close="closeModal"/>
        <!-- 
        <button class="floating-button">
            INICIAR
            <object class="right-arrow" type="image/svg+xml" data="/svgs/Vector.svg"></object>
        </button>
        -->
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
        font-size: 18px;
        font-weight: 500;
        padding-top: 15px;
    }
    
    .details {
        display: flex;
        flex-direction: row;
        padding: 40px 0px 0px 80px;
        align-items: stretch;
    }

    .car-details, .client-info {
        display: flex;
        flex-direction: column;
    }

    .veiculo, .cliente-title {
        font-size: 45px;
        padding-bottom: 30px;
    }

    .car-info, .client-info  {
        padding-bottom: 25px;
        font-size: 30px;
    }

    .motor {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px 0px 0px 80px
    }

    .tipo-motor {
        font-size: 30px;
        padding-bottom: 10px;
    }

    .motor-imgs {
        display: flex;
        padding-left: 110px;
        gap: 25px
    }

    .motor-imgs img{
        width: 80px;
        height: auto;
    }

    .separator {
        margin-left: 50px;
        margin-right: 50px;
        width: 2px;
        background-color: rgb(194, 181, 181);
    }

    .table-container {
        width: 95%;
        margin: 0 auto;
        padding-bottom: 50px;
    }

    .table-header {
        color: white;
        background-color: var(--color-red);
        height: 40px;
        font-family: var(--font-family);
        margin-top: 40px;
        padding: 10px 0px 0px 10px;
        font-size: 25px;
        margin-right: 12px;
    }

    .table-services {
        width: 100%; 
        height: 500px;
        overflow-y: scroll;
        padding-right: 15px;
    }

    .table-services table {
        width: 100%;
        border-collapse: collapse;
    }

    .table-services th {
        border: 1px solid #ccc;
        background-color: white;
        color: black;
        padding: 10px;
        text-align: left;
        font-size: 25px;
    }
    
    .table-services td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ccc;
        font-size: 25px;
    }

    .table-services th:nth-child(1) {
        width: 50%;  /* Coluna Estado */
    }

    .table-services th:nth-child(2) {
        width: 20%;  /* Coluna data */
    }

    .table-services th:nth-child(3) {
        width: 30%;  /* Coluna Data */
    }

    .table-services tr:nth-child(even) {
        background-color: white;
    }

    .table-services tr:nth-child(odd) {
        background-color: #D9D9D9;
    }

    /* scroll bar = atribuidos */
    .table-services::-webkit-scrollbar {
        width: 12px;
    }

    .table-services::-webkit-scrollbar-thumb {
        background-color: #949494;
        border-radius: 10px;
    }

    .table-services::-webkit-scrollbar-track {
        background-color: #E2E2E2;
    }


	.floating-button {
        position: fixed;
        right: 65px;
        bottom: 40px;
        z-index: 10;
    }

    .floating-button {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 1.2vw;
        padding: 12px 20px;
        width: 300px;
        height: auto;
        border-radius: 1vmin;
        border: none;
        cursor: pointer;
        /*font-weight: bold;*/
        align-items: center;
        justify-content: center;
        display: flex;
    }

    .floating-button img {
        margin-left: 10px;
        width: 24px;
        height: auto;
    }
    
    .right-arrow {
        width: 18px;
        margin-left: 10px;
        transform: rotate(180deg); 
        pointer-events: none; 
    }

    .btns {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        align-items: center;
    }
    
    .service-btn {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 1.2vw;
        padding: 12px 20px;
		width: 300px; /* auto? é suposto adaptar ao texo?*/
		height: auto;
        border-radius: 1vmin;
        border: none;
        cursor: pointer;
        /*font-weight: bold;*/
        align-items: center;
        justify-content: center;
        display: flex;
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