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
      name: 'TopPage',
      component: TopPage,
    },
    {
      path: '/info',
      name: '感染情報ダッシュボード',
      component: SecondInfectPage,
    },
    {
      path: '/map',
      name: '感染事例チェックマップ',
      component: SecondMapPage,
    },
    {
      path: '/news',
      name: '最新情報',
      component: SecondNewsPage,
    },
    {
      path: '/news/:id',
      name: '記事',
      component: ThirdNewsDetailPage,
    },
  ],
});
