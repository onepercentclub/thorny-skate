// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

const VueAwesomeSwiper = require('vue-awesome-swiper');

// mount with global
Vue.use(VueAwesomeSwiper);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  el: '#app',
  router,
  store,
  template: '<App/>',
});
