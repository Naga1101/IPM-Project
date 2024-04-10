  <script>
  
  export default {
    data() {
      return {
        // Propriedades do login
        // tipo de post??
        postoNumber: '08',

        combustaoImg: '/images/combustao_naoselected.png',
        eletricoImg: '/images/eletrico_naoselected.png',
        geralImg: '/images/universal_selected.png',

        // mudar a cor do texto
        combustaoColor: '#999999',
        eletricoColor: '#999999',
        geralColor: '#FFFFFF'

        //pode ser um array de especialidades com name img color e usar v-for na template
      }
    },
    methods: {
      // metodos
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
                <div class="separator"></div>

                <div class="login-form">
                    <div class="login-text">Introduza informações de login: </div>
                    <input type="text" placeholder="ID Funcionário" />
                    <input type="password" placeholder="Palavra-passe" />
                </div>
                <div class="btn-container">
                    <button class="login-btn">ENTRAR</button>
                </div>
            </div>
        </div>

        <div class="posto">
            <div class="posto-name"> POSTO {{ postoNumber }} </div>
            <div class="red-line"></div>
            <div class="especialidade" style="color: white; margin-bottom: 20px;"> 
                ESPECIALIDADES:
            </div>
            <div class="especialidade"> 
                <img :src="combustaoImg" alt="Combustão">
                <div :style="{color: combustaoColor}">COMBUSTÃO</div>
            </div>
            <div class="especialidade"> 
                <img :src="eletricoImg" alt="Elétrico">
                <div :style="{color: eletricoColor}">ELÉTRICO </div>
            </div>
            <div class="especialidade"> 
                <img :src="geralImg" alt="geral">
                <div :style="{color: geralColor}">GERAL</div> 
            </div>
        </div>
    </div>
  </template>
  
  <style scoped>
    
  .page {
    display: flex;
    flex-direction: row;
    background-color: #999999;
    max-width: 100vw;
    height: 100vh;
    font-family: "Lato", sans-serif;
    font-style: normal;
  }

  .header-login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #D9D9D9;
    text-align: left;
    padding: 15px;
    color: black;
    font-size: 40px;
    max-width: 100vw;
  }

  .content {
    display: flex;
    /* Ocupar o resto do espaço*/
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }

  .posto {
    width: 600px;
    height: 100vh;
    background-color: #5C5C5C;
    color: white;

    z-index: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .posto-name {
    color: white;
    font-size: 130px;
    font-weight: 300;
  }

  .red-line {
    height: 2px; 
    width: 400px;
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
    gap: 40px;
    font-size: 25px;
    padding: 10px;
    /* Vai ter de ser param */
    color: #999999;
    width: 400px;
  }

  .especialidade img{
    width: 75px;
    height: auto;
  }

  .carimg {
    position: absolute;
    bottom: 0;
    left: 550px;
  } 

  .carimg img{
    width: 800px;
    height: auto;
  }

  .login-square {
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
    margin: 40px;
    border-radius: 5px;
    cursor: pointer;

    font-size: 20px;
  }

  .login-text {
    width: 500px;
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
  }

  </style>
  