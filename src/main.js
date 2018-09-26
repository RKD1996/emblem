import Vue from 'vue'
import App from './App.vue'
//import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
//import VueSessionStorage from 'vue-sessionstorage'



Vue.config.productionTip = true
Vue.prototype.$hostname =
  (Vue.config.productionTip) ? 'https://api-emblem.herokuapp.com' : 'http://192.168.43.49:3000'

//Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: Vue.prototype.$hostname, // Your API domain
  //baseUrl: 'https://api-emblem.herokuapp.com', // Your API domain
  loginUrl: 'auth/sign_in',
  registerUrl: 'auth'
})

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  }
})

//Vue.use(VueSessionStorage)

const router = new VueRouter({
  routes: Routes,
});


new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
});
