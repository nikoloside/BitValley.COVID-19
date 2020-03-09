import Vue from 'vue';
import Router from 'vue-router';
import TopPage from '@/toppage/covid19_top';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'COVID-19',
      component: TopPage,
    },
  ],
});
