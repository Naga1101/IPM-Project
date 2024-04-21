<script>
import * as DBRequests from '../scripts/DBrequests.js';

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
        const userLoginData = await DBRequests.fetchUserLogin(this.user)
        const result = userLoginData.length === 1 && userLoginData[0].password === this.password
        
        if (result) {
          valid = true;
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
              <div class="linha"></div>
              <div class="helpbox" v-show="showHelp">
                <object class="error-symbol" type="image/svg+xml" data="/svgs/danger_symbol.svg"></object>
                <p>ERRO: Credenciais inválidas</p>
              </div>
              <div class="separator"></div>

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
  padding: 15px;
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
  font-size: 15vh;
  font-weight: 300;
  margin-top: 50px;
}

.red-line {
  height: 2px; 
  width: 53vh;
  background-color: red;
  margin: 40px;
}

.separator{
  height: 1px;
  width: 100%;
  margin: 20px;
  background-color: black;
}

.especialidade {
  display: flex;
  align-items: center;
  gap: 5vh;
  font-size: 4vh;
  padding: 1.5vh;
  /* Vai ter de ser param */
  color: #999999;
  width: 50vh;
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
  position: relative; /* Ensure the parent container is positioned */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  justify-content: center;

  margin-top: 80px;
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
  width: 515px;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
}

.login-form input{
  margin: 10px;
  width: 500px;
  height: 40px;
  border-radius: 5px;
  font-size: 20px;
  background-color: #DDE2E6;
  border: none;
  padding-left: 15px;
}

.linha {
  height: 2px;
  background-color: #000000; 
}

.helpbox {
  background-color: #FAC3C3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute; /* Make it absolute */
  top: 19%; /* Adjust as needed */
  left: 7%; /* Adjust as needed */
  width: 86%; /* Take full width of parent */
}

.error-symbol {
  width: 50px; /* Adjust width as needed */
  height: 50px; /* Adjust height as needed */
}

.error-symbol + p {
  color: #DC564E; /* Text color */
  font-size: 20px; /* Font size */
  font-weight: 600; /* Semibold */
  margin-left: 10px; /* Adjust spacing between SVG and text */
}
</style>
