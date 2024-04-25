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
		name: 'ModalConc',
		data() {
			return {
				title: "SUSPENDER",

				//valores a enviar para DB
				motivo: "",
			}
		},
		props: ['currentService'],

		methods: {
			async suspendService() {

				const result = await DBRequests.postSuspendedService(this.motivo,this.currentService.id)

				if (result) {
					this.currentService.estado = Consts.EstadoServico.PARADO

					//parar serviço a decorrer no registo de estado
					const dbData = serviceState();
					dbData.suspendService(this.motivo, this.currentService.id);

					this.$emit('suspend',result);
				}
			},

			close() {
				this.$emit('close');
			},
			closeOutsideModal() {
				this.close()
			},
			textClick(event) {
				event.stopPropagation()
			},
		},
	};
</script>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="outside-modal" @click="closeOutsideModal">
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
								Motivo:
							</span>
							<br>
							<textarea class="motivo" placeholder="Apontar motivos de suspensão aqui" v-model="motivo" @click="textClick">
							</textarea>
						</slot>
					</section>
	
					<footer class="modal-footer">
						<button type="button" class="botao-confirmar" @click="suspendService">
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
		margin: 0 0 5% 0;

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

	.motivo {
		box-sizing: border-box;
		padding: 0.25em;
		resize: none;
		overflow-y: scroll;
		border: 0;
		border-radius: 15px;
		height: 90%;
		width: 100%;
		margin-top: 5%;
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

	@media (width <= 700px) {
		.outside-modal {
			width: 0%;
			height: 0%;
		}

		.modal {
			width: 100%;
			height: 100%;
		}

		.lista-servicos-container {
			position: fixed;
			right: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-right: 1%;
			z-index: 200;
		}

		.menu-servicos-disponiveis {
			height: 50%;
		}

		.menu-servicos-disponiveis-item {
			font-weight: 400;
			font-size: 2.5vh;
		}

		.subtitulo {
			font-weight: 400;
			font-size: 2.5vh;
		}

		.botao-escolher-servico span {
			font-weight: 400;
			font-size: 2.5vh;
		}

		.titulo {
			font-weight: 400;
			font-size: 2.5vh;
		}

		.lista-servicos-item span {
			font-weight: 400;
			font-size: 2.5vh;
		}

		.botao-confirmar {
			font-weight: 400;
			font-size: 2.5vh;
		}
    }
</style>
