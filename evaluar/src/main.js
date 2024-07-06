import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { GiMushroomCloud, CoMagnifyingGlass } from "oh-vue-icons/icons";

addIcons(GiMushroomCloud, CoMagnifyingGlass);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-icon', OhVueIcon)

app.mount('#app')


