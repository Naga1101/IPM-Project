<!-- https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component -->

<template>
  <transition name="dialog-fade">
    <div class="dialog-backdrop" @click="close">  
      <dialog class="exit-popup" @click.stop="">
        <div class="faixa-vermelha"></div>
        <div class="mensagem">
          <div class="imgAviso">
            <img src="/svgs/danger_symbol_grey.svg" alt="simbolo aviso"/>
          </div>
          <div class="msg">
            <div class="upper-text">
              <span>Tem a certeza que pretende sair?</span>
            </div>
            <div v-if="servicoADecorrer" class="lower-text">
              <span  class="lower-title">
                Ações em progresso seram suspendidas
              </span>
              <p class="lower-servico">
                <b>Serviço: {{ servicoADecorrer.def_servico.descricao}} (#{{  servicoADecorrer.id }})</b>
              </p>
              <p class="lower-veiculo">
                <b>Veículo: {{ servicoADecorrer.id_veiculo }}</b> 
              </p>
            </div>
          </div>
        </div>
        <div class="linha"></div>
        <div class="butoes">
          <div class="imgRec" @click="close">
              <img src="/svgs/botao_recusar_popup.svg" alt="recusar"/>
            </div>
            <div class="imgConf" @click="logout">
              <img src="/svgs/botao_confirmar_popup.svg" alt="confirmar"/>
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
          servicoADecorrer: null
        };
      },

      methods: {
        goToPage(pageUrl) {
            this.$router.push(pageUrl);
        },

        async logout() {
          if (this.servicoADecorrer) { // se houver serviço a decorrer
            const result = await DBRequests.postSuspendedService("Suspensão automática: Logout detetado",this.servicoADecorrer.id)
            if (result) {
              //parar serviço a decorrer no registo de estado
              const dbData = serviceState();
              dbData.suspendService("Suspensão automática: Logout detetado", this.servicoADecorrer.id);

            }
          }
          this.goToPage("/login");
        },

        close() {
          this.$emit('close');
        },
      },

      updated() {
        const state = serviceState();
        this.servicoADecorrer = state.onGoingService
        console.log(this.servicoADecorrer)
      }
  }
</script>

<style scoped>
.exit-popup {
  position: fixed;
  width: 50vw;
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
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
}

.imgAviso {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgAviso img {
  width: calc(max(90%,60px));
  height: auto;
}

.msg {
  margin-left: 20px;
  flex: 3;
  display: flex;
  flex-direction: column;
}

.upper-text {
  margin-bottom: 15px;
  color: #000000;
  font-size: 1.5em;
}

.lower-text {
  font-size: 1.2em;
  color: var(--text-light-grey);
  justify-content: left;
  line-height: 25px;
}

.lower-text b{
  font-weight: 600;
}
.lower-servico, .lower-veiculo, .lower-title {
  text-align: left;
  margin: 0
}

.lower-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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
</style>
