<template>
  <div id="wrap">
    <Header></Header>
    <div id="wrap-contents">

      <PickUp></PickUp>

      <div class="section-wrapper wrap-shadow">
        <div id="section-infect" class="section wrap-sp-display">
          <div class="section-left" />日本感染情報
        </div>
        <InfectNumber></InfectNumber>
      </div>

      <div class="section-wrapper wrap-shadow">
        <div class="section section-region">
          <div class="section-left" />都道府県别感染者数
        </div>
        <InfectRegion />
      </div>

      <div class="section-wrapper wrap-shadow">
        <div class="section section-region">
          <div class="section-left" />世界感染情報
        </div>
        <InfectWorld/>
      </div>

      <div id="section-news" class="section section-news">
        <div class="section-left" />ニュース
      </div>
      <News></News>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/toppage/sections/covid19_header';
import PickUp from '@/toppage/sections/covid19_pickup';
import InfectNumber from '@/toppage/sections/covid19_infect_number';
import InfectRegion from '@/toppage/sections/covid19_infect_region';
import InfectWorld from '@/toppage/sections/covid19_infect_world';
import News from '@/toppage/sections/covid19_news';
import Footer from '@/toppage/sections/covid19_footer';

export default {
  name: 'TopPage',
  components: {
    Header,
    PickUp,
    InfectNumber,
    InfectRegion,
    InfectWorld,
    News,
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

    @media (max-width: $breakpoint-sp) {
      height: 30px;
    }
  }

  @include noto-font-001em(24px, bold);
  @media (max-width: $breakpoint-pc) {
    margin-left: 16px;
  }
  @media (max-width: $breakpoint-sp) {
    margin-left: 16px;
    @include noto-font-001em(20px, bold);
  }
}

.section-wrapper {
  margin: 24px;
  padding: 24px;

  @media (max-width: $breakpoint-sp) {
    margin: 24px 16px;
    padding: 24px 16px;
  }
}

.section-region {
  margin: 0;
}

.wrap-sp-display{
  display: none;
  @media (max-width: $breakpoint-sp) {
    display: flex;
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
