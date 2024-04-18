<template>
    <nav class="navbar">
		<button class="botao_back" type="button" :class="{'show_botao_back': linkBackTo}" @click="goToPage(linkBackTo)">
			<object class="left_arrow" type="image/svg+xml" data="/svgs/back_arrow.svg"></object>
			<span>VOLTAR ATRÁS</span>
		</button>
        <div class="posto_number">
            <span>E.S.Ideal - Posto 08</span>
        </div>
        <div class="right_data">
			<div class="mecanico">
				<img class="mecanico_foto" src="/images/profile_car_photo.png">
				<div class="mecanico_info">
					<span class="nome">João Antunes</span>
					<span class="id">ID: 29473</span>
				</div>
			</div>
			<button class="botao_sair" type="button" @click="logout">SAIR</button>
        </div>
    </nav>
  </template>

<script>
export default {
    props: {
        linkBackTo: {
                type: String,
                required: false,
                default: ""
            }
    },
    methods: {
        goToPage(pageUrl) {
            this.$router.push(pageUrl);
        },
        logout() {
            // testar se serviço a decorrer
                // se estiver, meter prompt de confirmar saída irá suspender serviço atual
            this.goToPage("/login");
        }
    }
}
</script>

<style scoped>

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7px 30px;
        background-color: #D9D9D9;
        color: black;
        height: fit-content;
        font-family: 'Lato', sans-serif; /* all text is lato semibold*/

    }

    .posto_number {
		/* nao sei fazer isto sem ser ignorar o resto do flex */
		/* as coisas tem tamanhos diferentes logo nunca vai ficar perfeitamente centrado, so fazendo isto */
		/* position: absolute;
		left: 50%;
		transform: translateX(-50%); */
		/* por agora vou tirar senao fica ainda pior com nomes grandes */
		font-size: 2vw;
        font-weight: 400;
        margin: 0 20px;
    }

    .right_data {
        display: inline-flex;
        align-items: center;
    }

    .botao_back {
        visibility: hidden;
    }

    .show_botao_back{
        visibility: visible;
    }

	/* TODO meter esta imagem maior */
    .botao_back, .botao_sair img {
		min-height: 100%;
 		object-fit: cover;
    }
	

	.mecanico {
		display: flex;
		align-items: center;
	}
	
    .mecanico_foto {
        object-fit: cover;
        width: auto;
        height: 3 em;
    }
    .mecanico_info {
		margin-left: 20px;
        display: inline-flex;
        flex-direction: column;
        padding-right: 5em; /* VOU ME PASSAR NAO CONSIGO METER ISTO EM PERCENTAGEM PORQUE?????????? */
    }

    .nome {
        font-size: 1.5vw;
        font-weight: 200px;
    }
    .id {
        padding-top: 3px;
        font-size: 1vw;
        color:#444444;
    }

    /* BOTOES */

    .left_arrow {
        object-fit: contain;
        height: max(20px,3.5vh);
        margin-right: 10px;
        margin-left: 0.2vw;
    }

    .botao_back, .botao_sair {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 1.5vw;
        padding: 12px 20px;
        /* width: 20vw;
        height: 50px; */
		width: auto;
		height: auto;
        border-radius: 2vmin;
        border: none;
        cursor: pointer;
        font-weight: semibold;
        align-items: center;
        justify-content: center;
        display: flex;
    }
</style>
