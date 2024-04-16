<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<script>
	export default {
		name: 'Modal',
		methods: {
			close() {
				this.$emit('close');
			},
		},
	};
</script>

<template>
	<transition name="modal-fade">
		<div class="modal-backdrop">
			<div class="modal">
				<header class="modal-header">
				<slot name="header">
					This is the default title!
				</slot>
				<button
					type="button"
					class="btn-close"
					@click="close"
				>
					x
				</button>
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
				<button
					type="button"
					class="btn-green"
					@click="close"
				>
					Close Modal
				</button>
				</footer>
			</div>
		</div>
	</transition>
</template>

<style scoped>
    /* TODO fazer com que isto apenas ocupe a parent div inteira e nao todo o viewport */
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
		position: relative;
		border-bottom: 1px solid #eeeeee;
		color: #4AAE9B;
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

	.btn-close {
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		font-size: 20px;
		padding: 10px;
		cursor: pointer;
		font-weight: bold;
		color: #4AAE9B;
		background: transparent;
	}

	.btn-green {
		color: white;
		background: #4AAE9B;
		border: 1px solid #4AAE9B;
		border-radius: 2px;
	}

	.modal-fade-enter, .modal-fade-leave-to {
		opacity: 0;
	}

	.modal-fade-enter-active, .modal-fade-leave-active {
		transition: opacity .5s ease;
	}
</style>