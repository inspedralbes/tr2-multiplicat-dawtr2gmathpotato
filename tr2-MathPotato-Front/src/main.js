import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import '/node_modules/primeflex/primeflex.css'
// import { createComponent } from '@vue/composition-api';

//import theme primevue

import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primeicons/primeicons.css'

//import components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AnimateOnScroll from 'primevue/animateonscroll';
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'
//Import de crypto

const app = createApp(App)
app.use(VueCryptojs)
app.use(createPinia())
app.use(router)
app.use(PrimeVue);
// app.component('my-component', createComponent({
//     // ...
    
//   }));

app.component('InputText', InputText);
app.component('Button', Button);
app.directive('animateonscroll', AnimateOnScroll);

app.mount('#app')
