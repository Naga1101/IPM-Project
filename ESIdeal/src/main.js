import { createApp } from 'vue'
import { createPinia } from 'pinia';

import './style.css'

import App from './App.vue';
import router from './router/index.js';

//components
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import LoadingPage from './components/LoadingPage.vue';


const pinia = createPinia();
const app = createApp(App)

//definir components globais, já que vão exsitir em quase todas as páginas
app.component('Navbar', Navbar);
app.component('Footer', Footer);
app.component('LoadingPage', LoadingPage);

app.use(router)
app.use(pinia)

app.mount('#app')
