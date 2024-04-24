import { createRouter, createWebHistory } from 'vue-router';
import loginPage from  '../components/Login.vue';
import servicoPage from '../components/ServicoEspecifico.vue';
import servicosAtribuidosPage from '../components/ServicosAtribuidos.vue';
import NotFoundPage from '../components/NotFound.vue';
import LoadingPage from '../components/LoadingPage.vue';

export default createRouter({
    history: createWebHistory(), // usar a history API do browser
    routes: [
      { path: '/', redirect: '/login'}, // redireciona de base para login
      { path: '/login', component: loginPage },
      { path: '/servico/:servicoID', component: servicoPage, props: true }, // considerar também fazer isto com nested routing?
      { path: '/atribuidos', component: servicosAtribuidosPage},
      { path: '/loading', component: LoadingPage},
      { path: '/:notFound(.*)', component: NotFoundPage} // rota para páginas não encontradas
    ],
});