import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Aplica o estilo global
document.body.style.backgroundColor = "#14151d";
document.body.style.color = "white";
document.body.style.margin = "0";
document.body.style.height = "100%";

app.use(router)
app.mount('#app')
