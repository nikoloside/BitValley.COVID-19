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
  head: {
    title() {
      return {
        inner: '「さよならコロナ」感染情報チェックマップ',
        separator: '|',
        complement: 'Home',
      };
    },
    meta() {
      return [
        { name: 'description', content: '「さよならコロナ」新型コロナウイルス感染情報チェックマップ' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '「さよならコロナ」感染情報チェックマップ' },
        { property: 'og:url', content: 'https://survival-jp.com' },
        { property: 'og:image', content: 'https://res.cloudinary.com/df6wesepg/image/upload/v1587817947/OGP_2.1_o1noa1.png' },
        { property: 'og:description', content: '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ];
    },
  },
  methods: {
    handleClick_changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
}).$mount('#app');
