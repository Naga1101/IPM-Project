<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<script>
	export default {
		name: 'Modal',
		data() {
			return {
				title: "Default title"
			}
		},
		methods: {
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
					<span>x</span>
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
						This is the default body!
					</slot>
				</section>

				<footer class="modal-footer">
					<slot name="footer">
						This is the default footer!
					</slot>
					<button type="button" class="botao-confirmar" @click="close">
						<span>CONFIRMAR</span>
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
		border-bottom: 1px solid #eeeeee;
		color: #4AAE9B;
		flex-direction: column;
		justify-content: space-between;
	}

	.modal-footer {
		border-top: 1px solid #eeeeee;
		flex-direction: column;
		justify-content: flex-end;
	}

	.modal-body {
		position: relative;
		padding: 20px 10px;
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
	}

	.botao-confirmar {
		width: fit-content;
		height: fit-content;
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 1.5vw;
		position: absolute;
        right: 33%;
		bottom: 5%;
        /* width: 20vw;
        height: 50px; */
        border-radius: 2vmin;
        border: none;
        cursor: pointer;
        font-weight: semibold;
        align-items: center;
        justify-content: center;
        display: flex;
	}

	.botao-confirmar img {
		min-height: 100%;
 		object-fit: cover;
    }

	.botao-fechar img {
		min-height: 100%;
 		object-fit: cover;
	}

	.titulo {
		font-size: 2vw;
        font-weight: 400;
		text-align: center;
		color: white;
	}
	
	.linha {
		margin-top: 5%;
		background-color: #DC564E;
		height: 5px;
		width: 80%;
		border: none;
	}
</style>