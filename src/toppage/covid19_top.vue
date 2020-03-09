<template>
  <div id="wrap">
    <Header></Header>
    <PickUp></PickUp>
    <InfectIncrease></InfectIncrease>
    <h1>都道府県别感染人数</h1>
    <InfectRegion></InfectRegion>
    <h1>ニュース</h1>
    <News></News>
    <h1>症状比較</h1>
    <Comparison></Comparison>
    <h1>予防対策</h1>
    <Measures></Measures>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/toppage/sections/covid19_header';
import PickUp from '@/toppage/sections/covid19_pickup';
import InfectIncrease from '@/toppage/sections/covid19_infect_increase';
import InfectRegion from '@/toppage/sections/covid19_infect_region';
import News from '@/toppage/sections/covid19_news';
import Comparison from '@/toppage/sections/covid19_comparison';
import Measures from '@/toppage/sections/covid19_measures';
import Footer from '@/toppage/sections/covid19_footer';

export default {
  name: 'TopPage',
  components: {
    Header,
    PickUp,
    InfectIncrease,
    InfectRegion,
    News,
    Comparison,
    Measures,
    Footer,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/commons/_variables.scss";
#wrap {
  background-color : #fff;
  min-width: 960px;
  max-width: 1280px;
  overflow: hidden;
}

h1 {
  padding-left: 10px;
  margin-left: 24px;
  color: $color-black;
  text-align: left;
  border-left: 4px solid #0452E6;
  border-radius: 2px;

  font-family: Noto Sans CJK JP;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  /* identical to box height */
  letter-spacing: 0.01em;
}

.wrap-shadow {
  box-shadow: $box-shadow-wrap;
  border-radius: 12px;
  margin: 24px;
}

.flex-container-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
a {
  text-decoration: none;
  color:$color-black;
  transition: color .3s ease;
  -webkit-transition: color .3s ease;
  &.router-link-exact-active {
    color: $color-black;
  }
}
a:hover{
    color: $color-blue;
}
</style>
