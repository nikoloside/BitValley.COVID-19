import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// 言語の設定
// eslint-disable-next-line import/no-unresolved
const languageMessages = require('../assets/language/messages.json');

export default new VueI18n({
  locale: 'cn',
  fallbackLocale: 'cn',
  messages: languageMessages,
});

