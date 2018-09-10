import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/css/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationTriangle,faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
