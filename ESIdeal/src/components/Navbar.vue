<template>
    <nav class="navbar">
		<button class="botao" type="button" >
			<img class="left_arrow" src="/images/left_arrow.png">
			<span>VOLTAR ATRÁS</span>
		</button>
        <div class="posto_number">
            <span>E.S.Ideal - Posto 08</span>
        </div>
        <div class="right_data">
			<div class="mecanico">
				<img src="/images/profile_car_photo.png">
				<div class="mecanico_info">
					<span class="nome">João Antunes</span>
					<span class="id">ID: 29473</span>
				</div>
			</div>
			<button class="botao" type="button" >SAIR</button>
        </div>
    </nav>
  </template>
  
<style scoped>

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
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

        font-weight: 400;
        font-size: 2.4vw;
        margin: 0 20px;
    }

    .right_data {
        display: inline-flex;
        align-items: center;
    }

	/* TODO meter esta imagem maior */
    img {
		min-height: 100%;
 		object-fit: cover;
    }
	

	.mecanico {
		display: flex;
		align-items: center;
	}
	
    .mecanico_info {
		margin-left: 20px;
        display: inline-flex;
        flex-direction: column;
        padding-right: 2.5em; /* VOU ME PASSAR NAO CONSIGO METER ISTO EM PERCENTAGEM PORQUE?????????? */
    }

    .nome {
        font-size: 2.3vw;
        font-weight: 200px;
    }
    .id {
        padding-top: 3px;
        font-size: 1.6vw;
        color:#444444;
    }

    /* BOTOES */

    .left_arrow {
        object-fit: contain;
        height: max(20px,3.5vh);
        margin-right: 10px;
        margin-left: 0.2vw;
    }

    .botao {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 2.4vw;
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
