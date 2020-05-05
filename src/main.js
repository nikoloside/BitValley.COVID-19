// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'leaflet/dist/leaflet.css';
import Vue from 'vue';
import VueHead from 'vue-head';
import VueScrollTo from 'vue-scrollto';
import App from './App';
import router from './router';
import i18n from './commons/i18n';

Vue.config.productionTip = false;
Vue.use(VueHead);
Vue.use(VueScrollTo, {
  duration: 500,
  offset: -100,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>',
  methods: {
    handleClick_changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
}).$mount('#app');
