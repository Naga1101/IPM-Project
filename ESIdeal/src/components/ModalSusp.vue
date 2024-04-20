<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<script>
	export default {
		name: 'ModalSusp',
		data() {
			return {
				title: "SUSPENDER",
				message: ""
			}
		},
		props: ['currentService'],
		methods: {
			async suspendService() {
				console.log(this.message,this.currentService.id)
				const result = await DBRequests.postSuspendedService(this.message,this.currentService.id)
				this.close()
			},
			close() {
				this.$emit('close');
			},
		},
	};
</script>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop" @click="close">
			<div class="modal">
				<button type="button" class="botao-fechar" @click="close">
					<span>X</span>
				</button>
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
						Motivo:
					</slot>
					
				</section>

				<section>
					<textarea v-model="message" class="textbox" placeholder="Apontar motivos de suspensão aqui "></textarea>
				</section>

				<footer class="modal-footer">
					
					<button type="button" class="botao-confirmar" @click="suspendService">
						<span>CONFIRMAR</span>
						<img src="/images/right.png" alt="right">
					</button>
				</footer>
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
		/* background-color: rgba(0, 0, 0, 0.3); */
		background: rgba(255, 255, 255, 0);
		background: linear-gradient(76deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 60%); 
		display: flex;
		justify-content: center;
		align-items: center;
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

	.modal-header,
	.modal-footer {
		padding: 15px;
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
		justify-content: flex-end;
	}

	.modal-body {
		position: relative;
		padding: 20px 10px;
		top: 20px;
		left: 70px;
		color : white;
		font-size: 1.5vw;
		font-weight: 500;
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
		border-radius: 100%;
		height: 50px;
		width: 50px;
		font-size: 25px;
		margin:1%;
	}

	.botao-confirmar {
    width: fit-content;
    height: fit-content;
    background-color: #DC564E;
    color: white;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 1.2vw;
    position: absolute;
    right: 33%;
    bottom: 5%;
    border-radius: 2vmin;
    border: none;
    cursor: pointer;
    font-weight: semibold;
    align-items: center;
    display: flex; 
}

	.botao-confirmar img {
		margin-left: 10px;
	}

	.botao-fechar img {
		min-height: 100%;
 		object-fit: cover;
	}

	.titulo {
		font-size: 3.2vw; 
		font-weight: semibold; 
		text-align: center;
		color: white;
	}
	
	.linha {
		margin-top: 5%;
		background-color: #DC564E;
		height: 5px;
		width: 80%;
	}

	.textbox {
		position: relative;
		left: 80px;
		top: 20px;
		width: 530px;
		height: 600px;
		background-color: white;
		border-radius: 20px;
		
		
}

	.textbox::placeholder {
		position: absolute;
		font-size: 18px;
		
	}
</style>