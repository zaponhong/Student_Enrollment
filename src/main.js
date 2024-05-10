import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
// import setAuthHeader from './libs/apis/axiosConfig'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'boxicons'
import 'jquery'
// import 'popper.js'
// import Vue from "vue";
// import VueNotifications from "vue-notifications";
const app = createApp(App)
// Vue.use(VueNotifications);
app.use(router)
app.use(store)

store.dispatch('setAuthHeaderIfNeeded');

app.mount('#app')