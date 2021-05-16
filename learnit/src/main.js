import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueMaterial);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

Vue.filter('formatDate', (value) => moment(String(value)).format('MM/DD/YYYY'));
