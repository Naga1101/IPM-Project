<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<script setup>
	import {serviceState} from '../scripts/stores.js';
	import * as DBRequests from '../scripts/DBrequests.js';
	import * as Consts from "../models/consts.js";

	const fechar = '/images/botao_fechar.svg';
	// const fechar_preto = '/images/botao_fechar_preto.svg';
	const confirmar = '/images/botao_confirmar.svg';
	const seta_baixo = "/images/down_arrow.svg"
</script>

<script>

	export default {
		name: 'Modal',
		data() {
			return {
				title: "CONCLUIR",
				servicos_disp: [],
				mostrarServicosDisponiveis: false,
				texto_pesquisa: "",
				text_click: false,

				//valores a enviar para DB
				notas: "",
				servicos: [],
				tipo_veiculo: null
			}
		},
		props: ['currentService'],

		methods: {
			async finishService() {
				const recommendedServicesId = this.servicos.map(service => service.id)
				const result = await DBRequests.postFinishedService(recommendedServicesId,this.notas,this.currentService.veiculo.id,this.currentService.id)

				if (result) {
					this.currentService.estado = Consts.EstadoServico.REALIZADO
					//parar serviço a decorrer no registo de estado
					const dbData = serviceState();
					dbData.clearOnGoingService(Consts.EstadoServico.REALIZADO);
					dbData.updateServiceState(this.currentService.id, Consts.EstadoServico.REALIZADO);
				}

				this.close()
			},

			close() {
				this.$emit('close');
				this.closeServicosDisponiveis()
			},
			closeOutsideModal() {
				if (this.mostrarServicosDisponiveis === true) {
					// fechar so a tab servicos disponiveis
					this.closeServicosDisponiveis()
				} else {
					// fechar tudo
					this.close()
				}
			},
			closeInsideModal() {
				if (this.mostrarServicosDisponiveis === true) {
					this.closeServicosDisponiveis()
				}
			},
			deleteServico(index) {
				this.servicos[index].selecionado = false
				this.servicos.splice(index, 1)
			},
			toggleServicosDisponiveis(event) {
				if (event != null) {
					event.stopPropagation()
				}
				this.mostrarServicosDisponiveis = !this.mostrarServicosDisponiveis;
			},
			addServico(event, servico) {
				servico.selecionado = true
				this.servicos.push(servico)
				this.closeServicosDisponiveis()
				event.stopPropagation()
			},
			closeServicosDisponiveis() {
				if (this.mostrarServicosDisponiveis === true) {
					this.mostrarServicosDisponiveis = false
				}
			},
			getServicosDisponiveis() {
				var res = []
				var texto_pesquisa_filtered = this.texto_pesquisa.toUpperCase();

				this.servicos_disp.forEach((servico) => {
					if (servico.selecionado === false) {
						if (servico.descr.toUpperCase().indexOf(texto_pesquisa_filtered) > -1) {
							res.push(servico)
						}
					}
				})
				return res
			},
			textClick(event) {
				event.stopPropagation()
			},
		},
		computed: {
			servDispEmpty() {
				return this.getServicosDisponiveis().length === 0
			}
		},
		async created() {
			const dbData = serviceState();
			var servicos = dbData.serviceDefinitions;
			var types = dbData.serviceTypes
			this.tipo_veiculo = this.currentService.veiculo.tipo

			// filtrar servicos que este veiculo pode ter
			types.forEach((type) => {
				if (type.id === this.tipo_veiculo) {
					servicos.forEach((servico) => {
						if (type.serviços.includes(servico.id)) {
							this.servicos_disp.push(servico)
						}
					})
				}
			})
				
			this.servicos_disp.forEach((servico) => {
				servico.selecionado = false
			})
			this.servicos_disp.sort((a, b) => {
				return a.descr.localeCompare(b.descr)
			})
			// var types = dbData.serviceTypes;
			// falta logica para filtrar os que nao dao para fazer neste posto
		}
	};
</script>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="outside-modal" @click="closeOutsideModal">
				<div class="lista-servicos-container" v-show="mostrarServicosDisponiveis">
					<input @click="textClick"  v-model="texto_pesquisa" type="text" class="inputNomeServico" placeholder="Insira o nome do serviço">
					</input>
					<ul class="menu-servicos-disponiveis">
						<li class="menu-servicos-disponiveis-item" v-for="serv in getServicosDisponiveis()" @click="addServico($event, serv)">
							<span>
								{{ serv.descr }}
							</span>
						</li>
						<li v-if="servDispEmpty" class="menu-servicos-disponiveis-item" @click="textClick">
							<span>Nenhum serviço encontrado</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="modal">
				<button type="button" class="botao-fechar" @click="close">
					<img :src="fechar" alt="X">
				</button>
				<div class="modal-content" @click="closeInsideModal">
					<header class="modal-header">
						<!-- <slot name="header">  -->
							<span class="titulo">
								{{  title  }}
							</span>
							<hr class="linha">
						<!-- </slot> -->
					</header>
	
					<section class="modal-body">
						<slot name="body">
							<span class="subtitulo">
								Recomendar serviços
							</span>
							<br>
							<button @click="toggleServicosDisponiveis" type="button" class="botao-escolher-servico">
								<span>
									Escolher serviço
								</span>
								<img :src="seta_baixo">
							</button>
							<ul class="lista-servicos">
								<li class="lista-servicos-item" v-for="(serv, index) in servicos">
									<span>{{ serv.descr }}</span>
									<button class="botao-apagar-servico" @click="deleteServico(index)">
										<!-- IGUAL AO QUE ESTA ABAIXO, MAS ASSIM POSSO MUDAR A COR COM CSS -->
										<!-- <img :src="fechar_preto" alt="X"> -->
										<svg width="25.005274" height="25.005274" viewBox="0 0 50.010548 50.010548" fill="none" version="1.1" id="svg68" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs72" /> <path fill-rule="evenodd"     clip-rule="evenodd"     d="M 19.73257,25.0055 0,5.2724755 5.2722481,0 25.005047,19.733025 44.737389,0 50.010547,5.2724755 30.277522,25.0055 50.010547,44.738072 44.737389,50.010547 25.005047,30.277748 5.2722481,50.010547 0,44.738072 Z"     fill="#000000"     id="path66"     style="display:inline;stroke-width:2.27321" /></svg>
									</button>
								</li>
							</ul>
						</slot>
					</section>
	
					<footer class="modal-footer">
						<slot name="footer">
							<span class="subtitulo">
								Outras notas:
							</span>
							<textarea class="notas" placeholder="Apontar eventuais notas aqui" v-model="notas" @click="textClick">
							</textarea>
						</slot>
						<button type="button" class="botao-confirmar" @click="finishService">
							<span>CONFIRMAR</span>
							<img :src="confirmar">
						</button>
					</footer>
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
    /* TODO fazer com que isto apenas ocupe a parent div inteira e nao todo o viewport */
	/* TODO melhorar o que acontece quando se da resize */
	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0);
		/* background: linear-gradient(76deg, rgba(255,255,255,0.4) 0%, rgba(220,86,78,0.4) 60%); */
		background: linear-gradient(76deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 60%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* nao gosto destas percentagens todas hardcoded mas nao consegui fazer sem isso */
	.outside-modal {
		width: 67%;
		height: 100%;
		/* position: absolute; */
		/* left: 0%; */
		display: flex;
		justify-content: flex-end;
	}

	.modal {
		width: 33%;
		height: 100%;
		/* position: absolute; */
		/* right: 0%; */
		background: #FFFFFF;
		box-shadow: 2px 2px 20px 1px;
		display: flex;
		flex-direction: column;
		background-color: #5C5C5C;
	}

	.modal-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30px 0 30px;
		gap: 25px;
		justify-content: space-between;
	}

	.modal-header,
	.modal-footer {
		display: flex;
	}
	
	.modal-header {
		height: fit-content;
		position: relative;
		color: #4AAE9B;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.modal-footer {
		flex-direction: column;
		/* justify-content: flex-end; */
		align-items: center;
	}

	.modal-body {
		position: relative;
		flex-grow: 1;
	}

	.modal-fade-enter, .modal-fade-leave-to {
		opacity: 0;
	}

	.modal-fade-enter-active, .modal-fade-leave-active {
		transition: opacity .5s ease;
	}

	.botao-fechar {
		background-color: #DC564E;
		color: white;
		border: 0;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		cursor: pointer;
	}

	.botao-fechar img {
		height: 100%;
		width: 100%;
	}

	.botao-confirmar {
		width: fit-content;
		height: fit-content;
        background-color: #DC564E;
        color: white;
        padding: 8px 20px;
        cursor: pointer;
        font-size: 1.5vw;
		/* position: absolute; */
        right: 33%;
		bottom: 5%;
        /* width: 20vw;
        height: 50px; */
        border-radius: 2vmin;
        border: none;
        font-weight: semibold;
        display: flex;
        align-items: center;
        justify-content: center;
		margin: 15px 0 15px 0;

	}

	.botao-confirmar img {
		margin-left: 0.35em;
		min-height: 100%;
 		object-fit: fill;
    }

	.botao-fechar img {
		min-height: 100%;
 		object-fit: cover;
	}

	.botao-escolher-servico {
		display: inline-flex;
		justify-content: space-between;
		border-radius: 15px;
		border: 0;
		width: 100%;
		background-color: lightgray;
		font-size: 1.15vw;
		text-align: left;
		font-weight: 400;
		padding: 2% 0 2% 5%;
		cursor: pointer;
	}

	.botao-escolher-servico:hover {
		background-color: darkgray;
	}

	.botao-escolher-servico img {
		margin-right: 5%;
		/* por causa de ilusao de otica */
		margin-top: 0.5%;
	}

	.titulo {
		font-size: 2vw;
        font-weight: 400;
		text-align: center;
		color: white;
	}

	.subtitulo {
		font-size: 1.5vw;
        font-weight: 400;
		text-align: left;
		color: white;	
	}
	
	.linha {
		margin-top: 5%;
		background-color: #DC564E;
		height: 5px;
		width: 100%;
		border: 0;
	}

	.notas {
		box-sizing: border-box;
		padding: 0.25em;
		resize: none;
		overflow-y: scroll;
		border: 0;
		border-radius: 15px;
		height: 200px;
		width: 100%;
		/* TODO falta meter uma barra de scroll bonita */
	}

	.lista-servicos {
		resize: none;
		overflow-y: scroll;
		/* height: 325px; */
		/* height: fit-content; */
		/* max-height: 325px; */
		position: absolute;
		height: 80%;
		width: 100%;
		padding: 0;
		/* list-style-type: none; especificamente nesta ul, se eu meter isto da cabo de tudo, e nao preciso disto para nao mostrar os pontos etc. nao percebo absolutamente nada disto, nao faz sentido nenhum, caguei fica assim*/
		/* TODO falta meter uma barra de scroll bonita */
	}

	.lista-servicos-item {
		display: flex;
		background-color: white;
		border-radius: 15px;
		margin-bottom: 15px;
		height: fit-content;
		border-radius: 15px;
		border: 0;
		font-size: 1.15vw;
		text-align: left;
		font-weight: 400;
		padding: 2% 0 2% 5%;
		justify-content: space-between;
		color: gray;
	}

	.botao-apagar-servico {
		border: 0;
		background-color: transparent;
		margin-right: 4%;
		height: 100%;
	}

	.botao-apagar-servico svg {
		cursor: pointer;
		border-radius: 50%;
		height: 100%;
	}

	.botao-apagar-servico:hover path {
		fill: #DC564E;
	}

	.menu-servicos-disponiveis {
		/* width: 50%; */
		/* position: absolute; */
		/* right: 25%; */
		display: flex;
		flex-direction: column;
		list-style-type: none;
		padding: 0;
		margin: 0;
		z-index: 100;
		overflow-y: scroll;
		max-height: 50%;
		/* box-shadow: 2px 2px 20px 1px; */
	}

	.menu-servicos-disponiveis-item {
		position: relative;
		border-color: black;
		border-style: solid;
		border-width: 0;
		border-bottom-width: 1px;
		width: 100%;
		background-color: lightgray;
		font-size: 1.15vw;
		text-align: left;
		font-weight: 400;
		cursor: pointer;
		padding: 2% 0 2% 0;
	}

	.menu-servicos-disponiveis-item span {
		margin-left: 5%;
		display: inline-block;
	}

						/*        se tiver bla<espaco>:hover so o span e que passa a mudar de cor, wtf */
	.menu-servicos-disponiveis-item:hover {
		background-color: darkgray;
	}

	.inputNomeServico {
		border: 0;
		/* flex-grow: 1; */
		font-weight: 400;
		font-size: 2.5vh;
		text-align: left;
		padding-left: 5%;
	}

	.lista-servicos-container {
		/* position: absolute; */
		width: 33%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 1%;
	}
</style>
