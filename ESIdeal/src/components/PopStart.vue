<script setup> 
import { ref } from 'vue';

const aviso = '/images/aviso.png';
</script>

<script>
    import {serviceState} from '../scripts/stores.js';
    import * as Consts from '../models/consts.js';
    import * as DBRequests from '../scripts/DBrequests.js';

    export default {
      name: 'PopStart',

      props: ['currService'],

      methods: {
        goToPage(pageUrl) {
            this.$router.push(pageUrl);
        },

        async startService(){

          // da update na db mas nao pega no estado que estava na db
          const result = await DBRequests.postStartedService(this.currService.id)

          if (result) {
            this.currService.estado = Consts.EstadoServico.ADECORRER; // para dar update visual da página

            //indicar serviço a inicar no registo de estado
            const dbData = serviceState();
            dbData.updateServiceState(this.currService.id, Consts.EstadoServico.ADECORRER)
            await dbData.addOnGoingService(this.currService.id)
            
          }

          this.close()
        },

        close() {
          this.$emit('close');
        },
      },

      updated() {
        const state = serviceState();
        this.servicoADecorrer = state.onGoingService
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
              <img src="/svgs/botao_recusar_popup.svg" alt="recusar"/>
            </div>
            <div class="imgConf" @click="startService">
              <img src="/svgs/botao_confirmar_popup.svg" alt="confirmar"/>
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

.butoes img {
  width: calc(max(90%,40px));
  height: auto;
  display: flex;
  justify-content: space-between;

}

.imgRec, .imgConf {
  cursor: pointer
}

.imgRec:hover, .imgConf:hover {
  opacity: 50%;
}

.butoes {
  padding: 5px 20px;
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

@media (max-width: 700px) {
    .exit-popup {
        width: 80%;
        height: auto;

    }
}

</style>

