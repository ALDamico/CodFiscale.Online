import Vue from 'vue';
import {BootstrapVue} from "bootstrap-vue";

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faUndo, faSpinner } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle, faUndo, faSpinner);

Vue.use(BootstrapVue);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
