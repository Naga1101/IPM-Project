<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<script setup>
	import {serviceState} from '../scripts/stores.js';

	const fechar = '/images/botao_fechar.svg';
	const fechar_preto = '/images/botao_fechar_preto.svg';
</script>

<script>

	export default {
		name: 'Modal',
		data() {
			return {
				title: "Default title",
				notas: "",
				servicos_disp: [],
				servicos: [],
				mostrarServicosDisponiveis: false
			}
		},
		methods: {
			close() {
				this.$emit('close');
				this.closeServicosDisponiveis()
			},
			deleteServico(index) {
				this.servicos.splice(index, 1)
			},
			toggleServicosDisponiveis() {
				this.mostrarServicosDisponiveis = !this.mostrarServicosDisponiveis;
			},
			addServico(servico) {
				this.servicos.push(servico)
				this.toggleServicosDisponiveis()
			},
			closeServicosDisponiveis() {
				if (this.mostrarServicosDisponiveis) {
					this.mostrarServicosDisponiveis = false
				}
			}
		},
		async created() {
			const dbData = serviceState();
			this.servicos_disp = dbData.serviceDefinitions;
			// var types = dbData.serviceTypes;
			// falta logica para filtrar os que nao dao para fazer neste posto
		}
	};
</script>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="outside-modal" @click="close">

			</div>
			<div class="modal">
				<button type="button" class="botao-fechar" @click="close">
					<img :src="fechar" alt="X">
				</button>
				<div class="modal-content">
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
							</button>
							<ul class="menu-servicos-disponiveis" v-show="mostrarServicosDisponiveis">
								<li class="menu-servicos-disponiveis-item" v-for="serv in servicos_disp" @click="addServico(serv)">
									<span>
										{{ serv.descr }}
									</span>
								</li>
							</ul>
							<ul class="lista-servicos">
								<li class="lista-servicos-item" v-for="(serv, index) in servicos">
									<span>{{ serv.descr }}</span>
									<button class="botao-apagar-servico" @click="deleteServico(index)">
										<img :src="fechar_preto" alt="X">
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
							<textarea class="notas" placeholder="Apontar eventuais notas aqui">
							</textarea>
						</slot>
						<button type="button" class="botao-confirmar" @click="close">
							<span>CONFIRMAR</span>
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

	.outside-modal {
		width: 100%;
		height: 100%;
	}

	.modal {
		width: 33%;
		height: 100%;
		position: fixed;
		right: 0%;
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
        padding: 8px 12px;
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
        align-items: center;
        justify-content: center;
        display: flex;
		margin-top: 15px;
	}

	.botao-confirmar img {
		min-height: 100%;
 		object-fit: cover;
    }

	.botao-fechar img {
		min-height: 100%;
 		object-fit: cover;
	}

	.botao-escolher-servico {
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

	.botao-apagar-servico img {
		cursor: pointer;
		border-radius: 50%;
		height: 100%;
	}

	.menu-servicos-disponiveis {
		position: absolute;
		list-style-type: none;
		padding: 0;
		margin: 0;
		z-index: 100;
	}

	.menu-servicos-disponiveis-item {
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
		padding: 0 0 0 5%;
	}
</style>
