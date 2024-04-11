<template>
    <nav class="navbar">
        <div class="botao">
            <button class="botao_voltar" type="button" >
                <img class="left_arrow" src="/images/left_arrow.png">
                <span>VOLTAR ATRÁS</span>
            </button>
        </div>
        <div class="posto_number">
            <p>E.S.Ideal - Posto 08</p>
        </div>
        <div class="right_data">
            <div class="mecanico">
                <img src="/images/profile_car_photo.png">
                <div class="mecanico_info">
                    <span class="nome">João Antunes</span>
                    <span class="id">ID: 29473</span>
                </div>
            </div>
            <div class="botao">
                <button class="botao_sair" type="button" >SAIR</button>
            </div>
        </div>
    </nav>
  </template>
  
    <script setup>
    </script>

<style scoped>

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;
        background-color: #D9D9D9;
        color: black;
        height: 70px;
        font-family: 'Lato', sans-serif; /* all text is lato semibold*/
    }

    .posto_number {
        display: flex;
        left: 50%;
        font-weight: 400;
        font-size: 25px;
        translate: 40%; /* meio aldrabado, TODO ver melhor*/
    }

    .right_data {
        display: flex;
        align-items: center;
    }

    .mecanico {
        display: flex;
        align-items: center;
    }

    img {
        height: 55px;
        width: auto;
    }

    .mecanico_info {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
    }

    .nome {
        font-size: 23px;
        font-weight: 200px;
    }
    .id {
        font-size: 16px;
        color:#444444;
    }

    /* BOTOES */

    .botao{
        align-items: center;
        display: flex;
        flex-direction: row;
    }

    .left_arrow {
        object-fit: contain;
        height: 30px;
        margin-right: 10px;
    }
    .botao_voltar {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 25px;
        padding: 12px 20px;
        width: 250px;
        height: 55px;
        border-radius: 15px;
        border: none;
        cursor: pointer;
        font-weight: semibold;
        align-items: center;
        display: flex;
    }

    .botao_sair {
        background-color: #DC564E;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 25px;
        padding: 12px 20px;
        width: 150px;
        height: 55px;
        border-radius: 15px;
        border: none;
        margin-left: 50px;
        cursor: pointer;
        font-weight: semibold;
        text-align: center;
        line-height: 25px;
    }
</style>