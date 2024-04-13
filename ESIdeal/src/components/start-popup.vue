<script>
  
export default {
  data() {
    return {
      // Propriedades do login

      aviso: '/images/aviso.png',
      recusar: '/images/recusar.png',
      confirmar: '/images/confirmar.png',
    }
  },
  methods: {
    // metodos
  },
}
</script>

<template>
<div class="exit-popup">
  <div class="faixa-vermelha"></div>
  <div class="mensagem">
      <div class="imgAviso">
        <img :src="aviso" alt="triangle">
      </div>
      <div class="msg">
        <p>Tem a certeza que pretende iniciar o serviço?</p>
      </div>
    </div>
  <div class="linha"></div>
  <div class="butoes">
    <div class="imgRec">
        <img :src="recusar" alt="rec-but">
      </div>
      <div class="imgConf">
        <img :src="confirmar" alt="conf-but">
      </div>
  </div>
</div>
</template>

<script setup>
// No script setup needed for now
</script>

<style scoped>
.exit-popup {
width: 551px;
height: 269px;
border-radius: 15px;
background-color: #FFFFFF;
border: 2px solid #DC564E;
display: flex;
flex-direction: column;
}

.faixa-vermelha {
height: 42px;
background-color: #DC564E;
border-radius: 10px 10px 0 0;
}

.mensagem {
height: 138px;
display: flex;
flex-direction: row;
align-items: center;
padding-right: 0%;
}

.imgAviso {
width: 20%; 
}

.imgAviso img {
max-width: 100%;
padding-left: 10%;
}

.mensagem .msg {
flex: 1;
}

.mensagem .msg p:nth-child(1) {
color: #000000;
font-size: 30px;
margin-top: 18px;
margin-bottom: 5px;
text-align: center;
font-family: 'Lato', sans-serif;
}

.linha {
height: 2px;
background-color: #DC564E; /* Black color */
}

.butoes {
flex: 1;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
}

.imgRec {
width: 20%; 
}

.imgRec img {
max-width: 68px;
max-height: 63px;
padding-left: 5%;
}

.imgConf {
width: 20%; 
}

.imgConf img {
max-width: 68px;
max-height: 63px;
padding-left: 35%;
}
</style>

