<template>
  <div id="app flex-container-spacebetween">
    <div id="wrap">
      <Header></Header>
      <PickUp></PickUp>
      <div id="wrap-contents">
        <router-view/>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/toppage/sections/covid19_header';
import PickUp from '@/toppage/sections/covid19_pickup';
import Footer from '@/toppage/sections/covid19_footer';

export default {
  name: 'App',
  components: {
    Header,
    PickUp,
    Footer,
  },
};
</script>

<style  lang="scss">
@import "./commons/_variables.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-black;
}

// 以下是所有的页面共通的scss 共通class
// Google Font
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500,700|Poppins:400,500,700&display=swap&subset=japanese');

// Plate的共通样式
.wrap-shadow {
  box-shadow: $box-shadow-wrap;
  border-radius: 12px;
}

// flex的共通化
.flex-container-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-container-spacebetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-direction-column {
  flex-direction: column;
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

// 这里开始是router-page的共通css

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

// 这里开始是地图的css

//! check map
.check-map-red {
  border-radius: 50%;
  background-color: $color-red;
  border:1px solid $color-red;
  box-shadow: 0px 0px 0px 12px rgba(237, 84, 76, 0.15);
  animation-name: anim01;
  animation-duration: 1s;
  animation-iteration-count : infinite;

  &-press {
    border-radius: 50%;
    background-color: $color-white;
    border:1px solid $color-white;
    box-shadow: 0px 0px 0px 12px rgba(237, 84, 76, 0.15);
    animation-name: anim01;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    position: relative;

    .virus {
      position: absolute;
      top: -35px;
      left: -18px;
      width: 50px;
      height: 50px;
      display: inline-block;
      background-image: url("./assets/image/map/virus@2x.png");
      background-repeat: no-repeat;
    }
  }
}

.check-map-green {
  border-radius: 50%;
  background-color: $color-green;
  border:1px solid $color-green;
  box-shadow: 0px 0px 0px 12px rgba(49, 217, 165, 0.5);
  animation-name: anim02;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  &-press {
    border-radius: 50%;
    background-color: $color-white;
    border:1px solid $color-white;
    box-shadow: 0px 0px 0px 12px rgba(49, 217, 165, 0.5);
    animation-name: anim02;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    position: relative;

    .virus {
      position: absolute;
      top: -35px;
      left: -18px;
      width: 50px;
      height: 50px;
      display: inline-block;
      background-image: url("./assets/image/map/recover@2x.png");
      background-repeat: no-repeat;
    }
  }
}

@keyframes anim01 {
    from {
      box-shadow: 0px 0px 0px 0px rgba(237, 84, 76, 0.15);
    }
    30% {
      box-shadow: 0px 0px 0px 12px rgba(237, 84, 76, 0.15);
    }
    50% {
      box-shadow: 0px 0px 0px 12px rgba(237, 84, 76, 0.15);
    }
    to {
      box-shadow: 0px 0px 0px 0px rgba(237, 84, 76, 0.15);
    }
}
@keyframes anim02 {
    from {
      box-shadow: 0px 0px 0px 0px rgba(49, 217, 165, 0.5);
    }
    30% {
      box-shadow: 0px 0px 0px 12px rgba(49, 217, 165, 0.5);
    }
    50% {
      box-shadow: 0px 0px 0px 12px rgba(49, 217, 165, 0.5);
    }
    to {
      box-shadow: 0px 0px 0px 0px rgba(49, 217, 165, 0.5);
    }
}

// click弹出窗口popup
.checkmappopup .leaflet-popup-content-wrapper,
.checkmappopup .leaflet-popup-tip-container {
  position: relative;
  top: -24px;
}

.checkmappopup .leaflet-popup-tip,
.checkmappopup .leaflet-popup-content-wrapper {
  background: $color-white;
  /* card shadow */
  box-shadow: 0px 6px 36px #E8ECF2;
  border-radius: 4px;
}

.checkmap-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: $color-white;
  padding: 4px;
}
.checkmap-id {
  @include poppins-font-001em(12px, bold);
  color: $color-black;
  margin-bottom: 8px;
}
.checkmap-main {
  @include noto-font-001em(12px, bold);
  color: $color-black;
  text-align: left;
  margin-bottom: 8px;
}
.checkmap-sub {
  @include noto-font-001em(12px, 500);
  color: $color-gray;
  text-align: left;
  margin-bottom: 8px;
}
.checkmap-connecttitle {
  @include poppins-font-001em(12px, bold);
  color: $color-black;
  text-align: left;
}
.checkmap-connecttext {
  @include poppins-font-001em(12px, bold);
  color: $color-pink;
  text-align: left;
  margin-bottom: 8px;
}
.checkmap-now {
  @include noto-font-001em(12px, bold);
  color: $color-black;
  text-align: left;
}
.checkmap-status {
  @include noto-font-001em(12px, bold);
  text-align: left;
  margin-bottom: 8px;
}

//! world map
// 左下角注释
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;

  h4 {
    margin: 0 0 5px;
    color: #777;
  }
}
.legend {
  line-height: 20px;
  color: $color-gray;
  text-align: left;
  @include poppins-font-001em(12px, bold);
  i {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 8px;
    border-radius: 4px;
  }
}
// hover弹出窗口popup
.custom .leaflet-popup-tip {
  display: none;
}
.custom .leaflet-popup-content-wrapper {
  background: #192A3E;
  opacity: 0.8;
  border-radius: 4px;
  padding: 0;
  margin: 0;
}
.world-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: $color-white;
  padding: 4px;
}
.world-country {
  @include noto-font-001em(12px, 500);
  color: $color-white;
}
.world-data {
  @include poppins-font-001em(8px, 500);
  color: $color-white;
  text-align: left;
}

.invisible-map-marker {
  display: none;
}
</style>
