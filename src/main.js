import Vue from 'vue'
import App from './App.vue'
import Ripple from 'vue-ripple-directive'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'
import './assets/css/main.css'
import VModal from 'vue-js-modal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationTriangle, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faExclamationTriangle,faSpinner,faCheckCircle)
Vue.use(VModal)
Vue.directive('ripple',Ripple)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
