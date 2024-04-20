<script>
	import ModalConc from './ModalConc.vue';
    import Navbar from './Navbar.vue';
    import Clock from './Clock.vue';
    import ModalSusp from './ModalSusp.vue';
    import {serviceState} from '../scripts/stores.js';
    import * as Consts from "../models/consts.js";

    export default {
        components: {
            Navbar,
            Clock,
			ModalConc,
            ModalSusp
        },
        props: {
            servicoID: { // recebido no URL
                type: String,
                required: true
            }
        },
        data() {
            return {
                servico: null,
                id: 1,
                descricao: "Service 1",
                estado: "POR INICIAR",
                
                // historicoServicos: [
                //     { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                //     { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                //     { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                //     { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                //     { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                //     { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                //     { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                //     { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                //     { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" },
                //     { servico: "Troca de óleo", estado: "Concluído", data: "2022-01-20" },
                //     { servico: "Revisão dos freios", estado: "Concluído", data: "2022-06-15" },
                //     { servico: "Substituição de pneus", estado: "Suspenso", data: "2022-12-01" }
                // ],

                sortColumn: null,
                sortOrder: null,

				mostrarMenuSuspender: false,
				mostrarMenuConcluir: false
            }
        },
		methods: {
			showModalConc() {
				this.mostrarMenuConcluir = true;
			},
			closeModalConc() {
				this.mostrarMenuConcluir = false;
			},
            showModalSusp() {
				this.mostrarMenuSuspender = true;
			},
			closeModalSusp() {
				this.mostrarMenuSuspender = false;
			},

            sortTable(coluna) {
                // ao clicar outra vez trocar entre asc/desc
                if (this.sortColumn === coluna) {
                    if (this.sortOrder === 'asc') {
                        this.sortOrder = 'desc';
                    } else {
                        this.sortOrder = 'asc';
                    }
                } else {
                    this.sortColumn = coluna;
                    this.sortOrder = 'asc';
                }
                // sort na lista dos historicos
                this.servico.historico.sort((a,b) => {
                    let val1 = a[coluna];
                    let val2 = b[coluna];
                    let result;

                    if(coluna === 'data') {
                        val1 = new Date(val1).getTime();
                        val2 = new Date(val2).getTime();
                    }
                    
                    if (val1 < val2){
                        result = -1;
                    }
                    else if (val1 === val2){
                        result = 0;
                    }
                    else {
                        result = 1;
                    }

                    if (this.sortOrder === 'asc'){
                        return result;
                    }
                    else{
                        return -result;
                    }
                });
            },
            isGasolina(servico){
                return servico.veiculo.tipo === Consts.TiposVeiculo.GASOLINA;
            },
            isGasoleo(servico){
                return servico.veiculo.tipo === Consts.TiposVeiculo.GASOLEO;
            },
            isHibrido(servico){
                return servico.veiculo.tipo === Consts.TiposVeiculo.HIBRIDO;
            },
            isEletrico(servico){
                return servico.veiculo.tipo === Consts.TiposVeiculo.ELETRICO;
            }
		},

        computed:{
            matricula(){
                try{    
                    const matricula = this.servico.veiculo.id;
                    console.log(matricula + " não mounted");
                    return matricula;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            marca(){
                try{    
                    const marca = this.servico.veiculo.marca;
                    console.log(marca + " não mounted");
                    return marca;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            modelo(){
                try{    
                    const modelo = this.servico.veiculo.modelo;
                    console.log(modelo + " não mounted");
                    return modelo;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            cilindrada(){
                try{    
                    const cilindrada = this.servico.veiculo.cilindrada;
                    console.log(cilindrada + " não mounted");
                    return cilindrada;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            motor(){
                try{    
                    const motor = this.servico.veiculo.motor;
                    console.log(motor + " não mounted");
                    return motor;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            potencia(){
                try{    
                    const potencia = this.servico.veiculo.potencia;
                    console.log(potencia + " não mounted");
                    return potencia;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            medidasJantes(){
                try{    
                    const medidasJantes = this.servico.veiculo.medidasJantes;
                    console.log(medidasJantes + " não mounted");
                    return medidasJantes;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            tipoMotor(){
                try{    
                    const tipoMotor = Consts.getTipoVeiculoString(this.servico.veiculo.tipo);
                    console.log(tipoMotor + " não mounted");
                    return tipoMotor;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            nomecliente(){
                try{    
                    const nomecliente = this.servico.cliente.nome;
                    console.log(nomecliente + " não mounted");
                    return nomecliente;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },
            contacto(){
                try{    
                    const contacto = this.servico.cliente.telefone;
                    console.log(contacto + " não mounted");
                    return contacto;
                } catch(e){
                    console.log(e)
                    return 1;
                }
            },

        },
        async created() {
            const dbData = serviceState();
            this.servico = await dbData.getServiceDetails(this.servicoID);
                    // NOTA: se quiserem obter os pormenores para cada servico que apareco no historico, têm de passar o servico inteiro à funcao buildServiceDetails
        },
    };

 </script>

<template>
    <Navbar linkBackTo="/atribuidos"/>
    <!-- test if data loaded -->
    <div v-if="servico" class="page"> 
        <div class="header">
            <h1>Detalhes de serviço</h1>
            <Clock class="clock"/>
        </div>
        
        <!-- Banner -->
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
        
        <div class="details">
            <!-- Car info -->
            <div class="car-details">
                <span class="veiculo"> Veículo </span>
                <span class="car-info"> Matricula: {{ servico.veiculo.id }} </span>
                <span class="car-info"> Marca: {{ servico.veiculo.marca }} </span>
                <span class="car-info"> Modelo: {{ servico.veiculo.modelo }} </span>
                <span class="car-info" v-if="tipoMotor === 'Gasolina' || tipoMotor === 'Gasóleo'"> Cilindrada: {{ cilindrada }} </span>
                <span class="car-info" v-if="tipoMotor === 'Elétrico' || tipoMotor === 'Híbrido'"> Potência do carregador: {{ potencia }}</span>
                <span class="car-info"> Medidas Jantes: {{ medidasJantes }}</span>
            </div>

            <!-- Motor info -->
            <div class="motor">
                <span class="tipo-motor"> Tipo de Motor: {{ tipoMotor }}</span>
                <div class="motor-imgs">
                    <!-- Motor combustão -->
                    <img v-if="tipoMotor === 'Gasolina' || tipoMotor === 'Gasóleo'" src="/images/combustao_naoselected.png" alt="combustao">
                    <!-- é suposto ter gasolina e gasóleo ou combustão só? -->
                    <!-- Motor Elétrico -->
                    <img v-else-if="tipoMotor === 'Elétrico'" src="/images/eletrico_naoselected.png" alt="eletrico">

                    <!-- Motor Híbrido -->
                    <span class="motor-imgs" v-else-if="tipoMotor === 'Híbrido'">
                        <img src="/images/combustao_naoselected.png" alt="combustao">
                        <img src="/images/eletrico_naoselected.png" alt="eletrico">
                    </span>
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
                    <object class="right-arrow" type="image/svg+xml" data="/svgs/forward_arrow.svg"></object>
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
                                <th @click="sortTable('servico')">Serviço</th>
                                <th @click="sortTable('estado')">Estado</th>
                                <th @click="sortTable('data')">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(service, index) in servico.historico" :key="index">
                                <td>{{ service.servico }}</td>
                                <td>{{ service.estado }}</td>
                                <td>{{ service.data }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
		<button v-show="!mostrarMenuConcluir && ! mostrarMenuSuspender" @click="showModalSusp" class="suspend-button">
            SUSPENDER
            <img src="/images/left_arrow.png" alt="arrow">
        </button>
		<ModalSusp v-show="mostrarMenuSuspender" @close="closeModalSusp" :currentService="this.servico"/>

		<button v-show="!mostrarMenuConcluir && !mostrarMenuSuspender" @click="showModalConc" class="floating-button">
            CONCLUIR
            <img src="/images/left_arrow.png" alt="arrow">
        </button>
		<ModalConc v-show="mostrarMenuConcluir" @close="closeModalConc" :currentService="this.servico"/>
        <!-- 
        <button class="floating-button">
            INICIAR
            <object class="right-arrow" type="image/svg+xml" data="/svgs/Vector.svg"></object>
        </button>
        -->
    </div>
    <LoadingPage v-else/>
    <Footer/>
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
        padding: 40px 0px 0px 70px;
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
        padding-left: 60px;
        gap: 25px;
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
        cursor: pointer;
        transition: background-color 0.5s;
    }

    .table-services th:hover {
        background-color: #f2f2f2;
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

    .suspend-button {
        position: fixed;
        left: 65px;
        bottom: 40px;
        z-index: 10;
    }

    .suspend-button {
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


    .suspend-button img {
        margin-right: 10px;
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