import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Lenis from 'lenis'
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore - Case sensitivity issue with GSAP Flip types
import Flip from "gsap/Flip";



export const lenis = new Lenis({
  autoRaf: true,
});

lenis.on('scroll', (e) => {
});

const app = createApp(App)
gsap.registerPlugin(ScrollTrigger, Flip);

app.use(createPinia())
app.use(router)

app.mount('#app')
