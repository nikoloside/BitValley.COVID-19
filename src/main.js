// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueHead from 'vue-head';
import VueScrollTo from 'vue-scrollto';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(VueHead);
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
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '新型コロナウイルス感染症対策サイト' },
        { property: 'og:url', content: 'http://covid-info.site' },
        { property: 'og:image', content: 'https://res.cloudinary.com/df6wesepg/image/upload/v1584804046/OGP_qgagfy.png' },
        { property: 'og:description', content: '新型コロナウイルス感染症対策サイト #新型コロナウイルス対策 #covid19 #新型肺炎　#新型コロナウイルス対策まとめ ' },
        { property: 'twitter:card', content: 'summary_large_image' },
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
