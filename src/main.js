import App from './App.vue';
import i18n from './i18n';
import './index.css';
import router from './router';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';
import { createApp } from 'vue';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(FloatingVue);

app.mount('#app');
