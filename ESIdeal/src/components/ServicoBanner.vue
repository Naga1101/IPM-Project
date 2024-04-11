<template>
    <div class="banner">
        <div class="rectangle"></div>
        <div class="info">
            <div class="left">
                <span class="nome">{{ descricao }} (#{{ id }})</span>
                <span class="estado">POR TERMINAR ÀS HORAS</span>
            </div>
            <div class="middle">
                <span class="duracao">Duração: {{ duracao }} min</span>
            </div>
            <div class="right">
                <img class="photo" src="/images/combustao_naoselected.png">
            </div>
        </div>
    </div>
  </template>

  <script>
    export default {
        props: { // variáveis do componente
            id: {
                type: Number,
                required: true
            },
            descricao: {
                type: String,
                required: true,
            },

            estado: {
                type: String,
                required: true,
            },
            duracao: {
                type: Number,
                required: false,
                default: ""
            }
        },
        computed: {}
    }
</script>

<style scoped>

    .banner {
        display: flex;
        height: var(--banner-height);
        min-width: var(--banner-width-min);
        /* width: var(--banner-width-normal); */
        width: 100%;
        background-color: var(--color-light-grey);
        flex-direction: row;

    }

    .rectangle{
        display: flexbox;
        background-color: var(--color-darker-grey);
        width: 30px;
        height: var(--banner-height);
    }

    .info {
        display: flex;
        align-items: top;
        justify-content: space-between;
        flex-direction: row;
        font-family: var(--font-family);
        padding: 17px 20px;
        width: 100%;
    }

   .left{
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        flex: 3;
        padding: 0px 15px 0px 0px;
   }

   .nome {
        flex:2;
        font-size: 22px;
        font-weight: 500;
        margin-bottom: auto;
        padding-bottom: 5px;
   }

   .estado {
        flex:1;
        font-size: 22px;
        font-weight: 400;
        color: var(--text-darker-grey);
        margin-top: auto;
   }

   .middle {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex: 1;
   }

   .right {
        display: flex;
        justify-content: right;
        align-items: center;
   }

    .duracao {
        display: flex;
        font-size: 22px;
        font-weight: 500;
    }

   .photo {
        padding: 0px 0px 0px 30px;
        height: 65px;
        width: 65px;
   }

</style>