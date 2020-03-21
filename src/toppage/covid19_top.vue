<template>
  <div id="wrap">
    <Header></Header>
    <div id="wrap-contents">
      <PickUp></PickUp>
      <div id="section-infect" class="section wrap-sp-display">
        <div class="section-left" />感染人数</div>
      <InfectNumber></InfectNumber>
      <div class="section section-region"><div class="section-left" />都道府県别感染人数</div>
      <InfectRegion></InfectRegion>
      <div id="section-news" class="section section-news"><div class="section-left" />ニュース</div>
      <News></News>
      <div id="section-comparison" class="section section-comparison">
        <div class="section-left" />症状比較</div>
      <Comparison></Comparison>
      <div id="section-measure" class="section section-measure">
        <div class="section-left" />予防対策</div>
      <Measures></Measures>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/toppage/sections/covid19_header';
import PickUp from '@/toppage/sections/covid19_pickup';
import InfectNumber from '@/toppage/sections/covid19_infect_number';
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
    InfectNumber,
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
}
#wrap-contents {
  // 先对应 960 和 1280 之间，等增加样式之后统一加@ media 的tag
  // 基本所有的component样式都是能默认自适应的
  min-width: 320px;
  max-width: 1280px;
  margin: 0 auto;
}

//! 以下是covid19_top内部所有的共通css class
// Covid19_top的标准h1
.section {
  display: flex;
  flex-direction: row;
  margin-left: 24px;
  color: $color-black;
  text-align: left;

  .section-left {
    width: 4px;
    height: 36px;
    border-radius: 2px;
    background: $color-primary;
    border-radius: 2px;
    margin-right: 9px;
  }

  @include noto-font-001em(24px, bold);
  @media (max-width: $breakpoint-pc) {
    margin-left: 16px;
  }
  @media (max-width: $breakpoint-sp) {
    margin-left: 16px;
  }
}

.wrap-sp-display{
  display: none;
  @media (max-width: $breakpoint-sp) {
    display: block;
  }
}

// link的共通样式
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

body {
  margin: 0;
}
</style>
