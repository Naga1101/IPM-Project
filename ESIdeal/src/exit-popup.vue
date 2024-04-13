  <script>
  
  export default {
    data() {
      return {
        // Propriedades do login

        aviso: '/images/aviso.png',
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
        <div class="img">
          <img :src="aviso" alt="triangle">
        </div>
        <div class="msg">
          <p>Têm a certeza que pretende sair?</p>
          <p>Todas as ações em progresso seram suspendidas</p>
        </div>
      </div>
    <div class="linha"></div>
    <div class="butoes"></div>
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

.img {
  width: 20%; 
}

.img img {
  max-width: 150%;
}

.mensagem .msg {
  margin-left: 30px;
  flex: 1;
}

.mensagem .msg p:nth-child(1) {
  color: #000000;
  font-size: 25px;
  margin-top: 30px;
  margin-bottom: 5px;
  font-family: 'Lato', sans-serif;
}

.mensagem .msg p:nth-child(2) {
  color: #727272;
  font-size: 20px;
  text-align: center;
  font-family: 'Lato', sans-serif;
  margin-bottom: 40px;
}



.linha {
  height: 2px;
  background-color: #DC564E; /* Black color */
}

.butoes {
  flex: 1; /* Fill remaining space */
}
</style>

