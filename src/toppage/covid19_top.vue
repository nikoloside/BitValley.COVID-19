<template>
  <div id="wrap">
    <Header></Header>
    <PickUp></PickUp>
    <InfectNumber></InfectNumber>
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
  // 先对应 960 和 1280 之间，等增加样式之后统一加@ media 的tag
  // 基本所有的component样式都是能默认自适应的
  min-width: 960px;
  max-width: 1280px;
  overflow: hidden;
}

//! 以下是covid19_top内部所有的共通css class
// Covid19_top的标准h1
h1 {
  padding-left: 10px;
  margin-left: 24px;
  color: $color-black;
  text-align: left;
  border-left: 4px solid #0452E6;
  border-radius: 2px;

  @include noto-font-001em(24px, bold);
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
