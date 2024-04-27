<script>
import * as DBRequests from '../scripts/DBrequests.js';
import {userState} from '../scripts/stores.js';

export default {
  data() {
    return {
      // Propriedades do login
      user: "",
      password: "",
      showHelp: false,
      // tipo de post??
      tipoPosto: 'Geral',
      postoNumber: '08',

      combustaoImg: '/images/combustao_selected.png',
      eletricoImg: '/images/eletrico_selected.png',
      geralImg: '/images/universal_selected.png',

      //pode ser um array de especialidades com name img color e usar v-for na template
    }
  },
  computed: {
    isFormCompleted() {
      return (this.user.length > 0 && this.password.length > 0);
    }
  },
  methods: {
    async validateLogin() {
      try {

        let valid = false;
        
        // verificar login
        const userLoginData = await DBRequests.fetchLoginByUsername(this.user)
        const result = userLoginData.length === 1 && userLoginData[0].password === this.password
        const userData = userLoginData[0]

        if (result) {
          valid = true;
          const state = userState()
          state.setInfo(userData.id, userData.nome, userData["foto-path"])
        }
        //se login falhar, mostrar ajuda
        if (!valid) {
          this.showHelp = true;
        }
        
        // se login válido ir para página de serviços atribuídos
        else {
          this.$router.push('/atribuidos');
        }

      } catch (error) {
          console.error("Error loading user login data:", error)
      }
    }

    // metodos

    // botao ser transparente enquanto dados inválidos
    // texto img igual
  },
}
</script>

<template>
  <div class="page">
      <header class="header-login">E.S.Ideal</header>

      <div class="content">
          <div class="carimg">
              <img src="/images/carro.png" alt="carbackground">
          </div>
          <div class="login-square">

              <div class="login-header"> ENTRAR EM POSTO</div>    

              <hr class="separator"></hr>

              <div class="helpbox" v-show="showHelp">
                <object class="error-symbol" type="image/svg+xml" data="/svgs/danger_symbol.svg"></object>
                <p>ERRO: Credenciais inválidas</p>
              </div>
              
              <div class="login-form">
                  <div class="login-text">Introduza informações de login: </div>
                  <input type="text" id="user" placeholder="Nome de Utilizador" v-model="user" />
                  <input type="password" id="password" placeholder="Palavra-passe" v-model="password"/>
              </div>
              <div class="btn-container">
                  <button class="login-btn" :class="{ 'disabled': !isFormCompleted }" @click="validateLogin">ENTRAR</button>
              </div>
          </div>
      </div>

      <div class="posto">
          <div class="posto-name"> POSTO {{ postoNumber }} </div>
          <div class="red-line"></div>
          <div class="especialidade-container">
            <div class="especialidade" style="color: white; margin-bottom: 20px;"> 
                <span>ESPECIALIDADES:</span>
            </div>
            <div class="especialidade"> 
                <img :src="combustaoImg" alt="Combustão"
                :style="{filter: tipoPosto === 'Combustão' ? 'none' : 'grayscale(100%)'}">
                <div :style="{color: tipoPosto === 'Combustão' ? 'white' : '#999999'}">COMBUSTÃO</div>
            </div>
            <div class="especialidade"> 
                <img :src="eletricoImg" alt="Elétrico"
                :style="{filter: tipoPosto === 'Elétrico' ? 'none' : 'grayscale(100%)'}">
                <div :style="{color: tipoPosto === 'Elétrico' ? 'white' : '#999999'}">ELÉTRICO</div>
            </div>
            <div class="especialidade"> 
                <img :src="geralImg" alt="geral"
                :style="{filter: tipoPosto === 'Geral' ? 'none' : 'grayscale(100%)'}">
                <div :style="{color: tipoPosto === 'Geral' ? 'white' : '#999999'}">GERAL</div>
            </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
  
.page {
  display: grid;
  grid-template-columns: 2fr 1fr; 
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  font-family: "Lato", sans-serif;
  font-style: normal;
  background-color: #999999;
  overflow: hidden;
}


.header-login {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #D9D9D9;
  color: black;
  padding: 3vh;
  font-size: 3vh;
  z-index: 1;
  font-weight: bold;
}


.content {
  grid-row: 2;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 30px;
}


.posto {
  grid-row: 2;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #5C5C5C;
  color: white;
}

.posto-name {
  color: white;
  font-size: 5em;
  font-weight: 300;
  margin-top: 50px;
}

.red-line {
  height: 2px; 
  width: 80%;
  background-color: red;
  margin: 40px;
}

.separator{
  width: 100%;
  margin: 20px;
  background-color: black;
}

.especialidade {
  display: flex;
  align-items: center;
  gap: 5vh;
  font-size: 1.2em;
  padding: 1.5vh;
  /* Vai ter de ser param */
  color: #999999;
  width: 50vmin;
}

.especialidade img{
  width: 4vw;
  height: auto;
}

.carimg {
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 550px;
} 

.carimg {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 300px;
}


.login-square {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 600px;
  height: 500px;
  background-color: white;
  border-radius: 20px;
}


.login-header {
  margin-top: 20px;
  font-size: 25px;
  font-weight: bold;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 20px;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.login-btn {
  border: none;
  background-color: #DC564E;
  color: white;
  border: 5px;
  padding: 20px 50px;
  margin: 43px;
  border-radius: 5px;
  cursor: pointer;
  
  font-size: 20px;
}

.login-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.login-text {
  width: 100%;
  margin: 10px;
  font-size: 1.1em;
  font-weight: bold;
  padding-right: 14px;
}

.login-form input{
  margin: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: 1.1em;
  background-color: #DDE2E6;
  border: none;
  padding-left: 15px;
}

.helpbox {
  background-color: #FAC3C3;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 86%; 
}

.error-symbol {
  width: 50px;
  height: 50px; 
  padding-left: 15px; 
}

.error-symbol + p {
  color: #DC564E; 
  font-size: 1.2em; 
  font-weight: 600; 
  margin-left: 10px;
}

@media (max-width: 975px) {
  .page {
    display: flex; 
    flex-direction: column; 
    min-height: 100vmin;
    font-family: "Lato", sans-serif;
    font-style: normal;
    background-color: #999999;
    padding-top: 20px;
  }

  .header-login {
    padding: 5px;
  }

  .login-square{
    width: 90%;
    height: 90%;
  }

  .content{
    z-index: 0;
  }

  .posto{
    margin-top: 30px;
  }
}

</style>
