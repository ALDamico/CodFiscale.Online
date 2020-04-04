import Vue from 'vue';
import {BootstrapVue, BootstrapVueIcons} from "bootstrap-vue";

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faUndo, faSpinner, faCreditCard, faCopy, faSearch } from '@fortawesome/free-solid-svg-icons'
import 'primevue/resources/themes/nova-vue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Navbar from "@/components/Navbar.vue";

library.add(faCheckCircle, faUndo, faSpinner, faCreditCard, faCopy, faSearch);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.component('navbar', Navbar);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
