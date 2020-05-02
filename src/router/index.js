import Vue from 'vue';
import Router from 'vue-router';
import TopPage from '@/toppage/covid19_top';
import SecondInfectPage from '@/toppage/pages/covid19_second_infect';
import SecondMapPage from '@/toppage/pages/covid19_second_map';
import SecondNewsPage from '@/toppage/pages/covid19_second_news';
import ThirdNewsDetailPage from '@/toppage/pages/covid19_third_newsdetail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'top',
      component: TopPage,
    },
    {
      path: '/info',
      name: 'info',
      component: SecondInfectPage,
    },
    {
      path: '/map',
      name: 'map',
      component: SecondMapPage,
    },
    {
      path: '/news',
      name: 'news',
      component: SecondNewsPage,
    },
    {
      path: '/news/:id',
      name: 'newsdetail',
      component: ThirdNewsDetailPage,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ThirdNewsDetailPage,
    },
  ],
});
