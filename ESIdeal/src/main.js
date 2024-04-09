import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';

import loginPage from  './components/Login.vue';
import servicoPage from './components/Servico.vue';
import servicosAtribuidosPage from './components/ServicosAtribuidos.vue';
import NotFoundPage from './components/NotFound.vue';

const router = createRouter({
    history: createWebHistory(), // usar a history API do browser
    routes: [
      { path: '/', redirect: '/login'}, // redireciona de base para login
      { path: '/login', component: loginPage },
      { path: '/servico/:servicoID', component: servicoPage, props: true }, // considerar também fazer isto com nested routing?
      { path: '/atribuidos', component: servicosAtribuidosPage},
      { path: '/:notFound(.*)', component: NotFoundPage} // rota para páginas não encontradas
    ],
});

const app = createApp(App)

app.use(router)

app.mount('#app')
