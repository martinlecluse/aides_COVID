import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS file
import 'bootstrap/dist/css/bootstrap.css'
import './assets/style/tab-donnees.css'
import './assets/style/dashboard.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
