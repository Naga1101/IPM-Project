<script setup> 
import { ref } from 'vue';

const aviso = '/images/aviso.png';
const recusar = '/images/recusar.png';
const confirmar = '/images/confirmar.png';
</script>

<script>
    export default {
      name: 'PopStart',
      methods: {
        goToPage(pageUrl) {
            this.$router.push(pageUrl);
        },
        start() {
          this.goToPage("/");
        },
        close() {
          this.$emit('close');
        },
      },
    }
</script>

<template>
  <transition name="dialog-fade">
    <div class="dialog-backdrop">      
      <dialog class="exit-popup">
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
          <div class="imgRec" @click="close">
              <img :src="recusar" alt="rec-but">
            </div>
            <div class="imgConf" @click="start">
              <img :src="confirmar" alt="conf-but">
            </div>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<style scoped>
.exit-popup {
width: 551px;
height: 269px;
border-radius: 15px;
background-color: #FFFFFF;
border: 2px solid #DC564E;
display: flex;
flex-direction: column;
padding: 0;
top: 25%;
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

.dialog-fade-enter, .dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active, .dialog-fade-leave-active {
  transition: opacity .5s ease;
}

.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5000;
  /* background-color: rgba(0, 0, 0, 0.3); */
  background: rgba(255, 255, 255, 0);
  background: linear-gradient(76deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.4) 60%); 
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

