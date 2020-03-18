<template>
  <div id="HeaderSpBlock" class="flex-container-spacebetween">
    <div class="covid19-logo">
    </div>
    <div class="covid19-sp-button">
        <HeaderSpButton />
    </div>
  </div>
</template>

<script>
import HeaderSpButton from '@/components/HeaderSpButton';

export default {
  name: 'HeaderPcBlock',
  components: {
    HeaderSpButton,
  },
  data() {
    return {
      msg: 'SpHeader',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#HeaderSpBlock {
  background-color: $color-background;
  z-index:$z-index-header;
  // width
  width: 100vw;
  height: 72px;
  // fixed
  position: fixed;
  top: 0px;
  left: 0px;
  right:0px;
  overflow: visible;
  display: none;
  @media (max-width: $breakpoint-sp) {
      display: flex;
  }

  .covid19-logo {
    background-image:url('../assets/image/logo.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 248px;
    height: 36px;
    position: absolute;
    top: 18px;
    left: 16px;
  }

  .covid19-sp-button {
    width: 24px;
    height: 24px;
    position:absolute;
    right: 16px;
    top: 24px;
  }

  @media (max-width: $breakpoint-pc) {

  }

  // 下划线动画特效
  li{
    min-width: 64;
    height: 19px;

    display: flex;
    align-items: center;
    text-align: center;

    a {
      // 只有header这部分字体和size是分开，特殊处理
      font-family: SF Compact Display;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 42px;
      /* identical to box height */
      position: relative;
      margin: 0 12px;
      transition: color .3s ease;
      -webkit-transition: color .3s ease;
      background-color: #fff;
      z-index: $z-index-over;
    }
    a:hover{
        color: $color-blue;
    }
    a::after {
      border-bottom: solid 4px $color-blue;
      border-radius: 2px;
      bottom: 0;
      display: block;
      content: "";
      transition: all .3s ease;
      -webkit-transition: all .3s ease;
      width: 0;
    }
    a:hover::after {
      width: 100%;
    }
  }
}
</style>
