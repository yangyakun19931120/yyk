import Vue from 'vue'
import App from './App.vue'
import router from './router';
import axios  from 'axios';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$$appId = 'wx0fce8efa034607ab'


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
