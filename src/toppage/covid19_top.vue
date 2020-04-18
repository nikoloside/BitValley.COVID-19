<template>
  <div id="wrap">
    <Header></Header>
    <div id="wrap-contents">

      <PickUp></PickUp>


      <div class="section-dashboard">
      <div class="section-japan">
        <div id="section-infect" class="section-wrapper wrap-shadow section-infect">
          <div class="section">
            <div class="section-left" />{{ $t("messages.titlejapan") }}
          </div>
          <InfectNumber></InfectNumber>
        </div>

        <div id="section-region" class="section-wrapper wrap-shadow section-region">
          <div class="section">
            <div class="section-left" />{{ $t("messages.titleregion") }}
          </div>
          <InfectRegion />
        </div>
      </div>

      <div id="section-world" class="section-wrapper wrap-shadow section-world">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titleworld") }}
        </div>
        <InfectWorld/>
      </div>
      </div>

      <div id="section-checkmap" class="section-wrapper wrap-shadow section-checkmap">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titlecheckmap") }}
        </div>
        <CheckMap/>
      </div>

      <div id="section-news" class="section section-news">
        <div class="section-left" />{{ $t("messages.titlenews") }}
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
import CheckMap from '@/toppage/sections/covid19_check_map';
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
    CheckMap,
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

.wrap-sp-display{
  display: none;
  @media (max-width: $breakpoint-sp) {
    display: flex;
  }
}

// ver1.2仕様 必须通过列表进行切换
.section-dashboard {
  display: flex;
  @media (max-width: $breakpoint-pc) {
    flex-direction: column;
  }
}
.section-japan {
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: $breakpoint-pc) {
    width:100%;
  }
}
.section-infect {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-region {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-world {
  .section {
    margin-left: 0px;
  }
  width: 50%;
  margin-left:0px;
  margin-right:24px;
  margin-top: 12px;
  margin-bottom: 12px;
  @media (max-width: $breakpoint-pc) {
    width: auto;
    margin: 12px 16px;
  }
}

.additional-topinfo {
  @include noto-font-001em(14px, bold);
  padding: 0;
  margin: 8px 0;
  color: $color-gray;
  position: absolute;
  top: -48px;
  right: 0px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}

.additional-info {
  @include noto-font-001em(14px, normal);
  padding: 0;
  margin: 8px 0;
  color: $color-lightgray;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}

// link的共通样式
ul {
  list-style:none;
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

body {
  margin: 0;
}
</style>
