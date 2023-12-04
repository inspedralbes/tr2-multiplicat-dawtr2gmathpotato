import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
// import { createComponent } from '@vue/composition-api';

//import theme primevue

import 'primevue/resources/themes/md-light-deeppurple/theme.css';

//import components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
// app.component('my-component', createComponent({
//     // ...
    
//   }));

app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app')
