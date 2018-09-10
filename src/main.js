import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/main.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
