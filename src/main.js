import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import i18n from './i18n';
import FloatingVue from 'floating-vue';
import 'floating-vue/dist/style.css';

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(FloatingVue);

app.mount('#app');
