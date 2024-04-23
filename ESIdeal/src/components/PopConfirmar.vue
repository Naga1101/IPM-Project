<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<template>
  <transition name="dialog-fade">
    <div class="dialog-backdrop" @click="close">  
      <dialog class="confirmar-popup" @click.stop="">
        <div class="faixa-vermelha"></div>
        <div class="mensagem">
          <div class="msg">
            <div class="upper-text">
              <span>Serviço concluído com sucesso</span>
            </div>
            <div class="lower-text">
                Vai ser redirecionado para a página inicial em... {{ tempoRestante }} seg
            </div>
          </div>
          <div class="botao-div">
            <div class="img-div">
              <img class="confirmar-icone" src="/svgs/botao_confirmar_popup_cinz.svg" alt="confirmado"/>
            </div>
            <button class="botao-voltar" @click="close">
              <span>VOLTAR</span>
              <img src="/svgs/forward_arrow.svg" alt="voltar"/>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  </transition>
</template>

<script>
  import {serviceState} from '../scripts/stores.js';
  import * as Consts from '../models/consts.js';
  import * as DBRequests from '../scripts/DBrequests.js';

  export default {
    name: 'PopExit',

    data() {
      return {
        tempoRestante: 5
      };
    },

    props: ['tipoEstado'],

    methods: {
      goToPage(pageUrl) {
          this.$router.push(pageUrl);
      },
      startTimeout(){
        //TODO: meter timeout
      }
    }
  }
</script>

<style scoped>
.confirmar-popup {
  position: fixed;
  width: 60vmin;
  height: fit-content;
  border-radius: 15px;
  background-color: #FFFFFF;
  border: 2px solid #DC564E;
  display: flex;
  flex-direction: column;
  padding: 0;
  top: 25%;
}

.faixa-vermelha {
  height: 50px;
  background-color: #DC564E;
  border-radius: 10px 10px 0 0;
}

.mensagem {
  display: flex;
  height: 100%;
  flex-direction: row;
  padding: 20px 40px;
  overflow: hidden;
}

.msg {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  justify-content: space-evenly;
  flex-grow:1;
}

.upper-text {
  margin-bottom: 15px;
  color: #000000;
  font-size: 1.4em;
}

.lower-text {
  font-size: 1.2em;
  color: var(--text-light-grey);
  justify-content: left;
  line-height: 25px;
  display: flex;
  flex-direction: column;
}

.botao-div {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end
}

.img-div {
  position: absolute;
  width: fit-content;
  z-index: -1;
  right:0;

}

.confirmar-icone {
  margin: 0;
  width: 100%;
  height: auto;
  transform: translate(-10%, 0%);
}

.botao-voltar {
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: #DC564E;
  color: white;
  font-size: 1.2em;
  padding: 12px 20px;
  border-radius: 2vmin;
  border: none;
  width: fit-content;
  max-width: 200px;
}

.botao-voltar img {
  object-fit: contain;
  height: 1.5em;
  width: auto;
  margin-left: 0.2vw;
}

.botao-voltar span {
  margin-right: 20px;
  font-size: 1em;
}
.botao-voltar:hover{
  opacity: 50%;
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
