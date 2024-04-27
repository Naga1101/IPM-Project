<template>
    <nav class="navbar">
		<button class="botao_back" type="button" v-show="linkBackTo" @click="goToPage(linkBackTo)">
			<img src="/svgs/back_arrow.svg"></img>
			<span>VOLTAR ATRÁS</span>
		</button>
        <div class="posto_number">
            <span>E.S.Ideal - Posto 08</span>
        </div>
        <div class="right_data">
			<div class="mecanico">
				<img class="mecanico_foto" :src="userFotoPath">
				<div class="mecanico_info">
					<span class="nome">{{ userStore.userNome}}</span>
					<span class="id">ID: {{userStore.userId}}</span>
				</div>
			</div>
			<button class="botao_sair" type="button" @click="showExitPopup">
                <span>SAIR</span>
                <img src="/svgs/exit_door.svg"></img>
            </button>
            <PopExit v-show="mostrarExitPopup" @close="closeExitPopup"/>
        </div>
    </nav>
  </template>

<script>
import PopExit from './PopExit.vue';
import {userState} from '../scripts/stores.js';

export default {
    props: {
        linkBackTo: {
                type: String,
                required: false,
                default: "",
            }
        },
    components:{
        PopExit
    },

    data(){
        return{
            mostrarExitPopup: false,
            userStore: userState()
        }
    },

    computed: {
        userFotoPath() {
            return "/images/" + this.userStore.userFotoPath
        }
    },

    methods: {

        goToPage(pageUrl) {
            var previousUrl = document.referrer;
            if (previousUrl) { // se veio da mesma página, com outros argumentos
                this.$router.go(-1);
            } else { // senão ir para url default passado como argumento, aka outra página
                this.$router.push(pageUrl);
            }
        },
        showExitPopup() {
			this.mostrarExitPopup = true;
		},
		closeExitPopup() {
			this.mostrarExitPopup = false;
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
		font-size: 1.4em;
        font-weight: 400;
        margin: 0 20px;
    }

    .right_data {
        display: inline-flex;
        align-items: center;
    }

	/* TODO meter esta imagem maior */
    .botao_back img, .botao_sair img {
		height: 25px;
 		object-fit:contain;
        fill: white;
    }

    .botao_back span {
        padding-left: 10px;
    }

    .botao_sair span {
        padding-right: 10px;
    }
	
	.mecanico {
		display: flex;
		align-items: center;
	}
	
    .mecanico_foto {
        object-fit: cover;
        height: fit-content;
    }

    .mecanico_info {
		margin-left: 20px;
        display: inline-flex;
        flex-direction: column;
        padding-right: 3em;
    }

    .nome {
        font-size: 1em;
        font-weight: 200px;
    }
    .id {
        padding-top: 3px;
        font-size: 1em;
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
        font-size: 1.1em;
        padding: 12px 20px;
        /* width: 20vw;
        height: 50px; */
		width: auto;
		height: 2.5em;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        font-weight: semibold;
        align-items: center;
        justify-content: center;
        display: flex;
    }

    @media (max-width: 1080px) {
        .posto_number {
            font-size: 1.2em;
        }

        .mecanico_foto {
            width: 4em;
            height: auto;
        }

        .navbar {
            padding: 5px 20px;
        }
    }
    @media (max-width: 700px) {
        
        .navbar {
            justify-content: right;
        }
        .posto_number {
            font-size: 1.2em;
        }

        .left_arrow {
            height: 15px;
            width: auto;
        }

        .botao_back {
            padding: 5px 15px;
            margin-right: auto;
        }

        .botao_back, .botao_sair {
            font-size: 1em;
        }
        .nome {
            font-size: 1em;
        }

        .id {
            font-size: 1em;
        }

        .mecanico_foto, .posto_number {
            display: none;
        }

    }

    @media (max-width: 500px) {
        .mecanico_info{
            display: none;
        }
    }

</style>
