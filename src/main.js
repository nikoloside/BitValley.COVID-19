// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueHead from 'vue-head';
import VueScrollTo from 'vue-scrollto';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';


Vue.config.productionTip = false;
Vue.use(VueHead);
Vue.use(VueI18n);
Vue.use(VueScrollTo, {
  duration: 500,
  offset: -120,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  head: {
    title() {
      return {
        inner: '新型コロナウイルス感染症対策サイト',
        separator: '|',
        complement: 'Home',
      };
    },
    meta() {
      return [
        { name: 'description', content: '新型コロナウイルス感染症対策サイト' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
      // ...
      ];
    },
    data: {
      toInfect: '#section-infect',
      toNews: '#section-news',
      toComparison: '#section-comparison',
      toMeasure: '#section-measure',
    },
  },
});
