<template>
  <div id="covid19-header" class="flex-container-spacebetween">
    <div class="covid19-logo">
    </div>
    <div class="nav flex-container-spacebetween">
      <li><router-link to="/">感染情報</router-link></li>
      <li><router-link to="/">ニュース</router-link></li>
      <li><router-link to="/">症状比較</router-link></li>
      <li><router-link to="/">予防対策</router-link></li>
      <div class="social flex-container-spacebetween">
        <li><router-link to="/" class="facebook"></router-link></li>
        <li><router-link to="/" class="twitter"></router-link></li>
        <li><router-link to="/" class="sharelink"></router-link></li>
      </div>
      <QuestionButton></QuestionButton>
    </div>
  </div>
</template>

<script>
import QuestionButton from '@/components/QuestionButton';

export default {
  name: 'Header',
  components: {
    QuestionButton,
  },
  data() {
    return {
      scrollY: true,
    };
  },
  methods: {
    handleScroll() {
      // Any code to be executed when the window is scrolled
      this.scrollY = window.scrollY > window.innerHeight + 20;
    },
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-header {
  background-color: $color-background;
  z-index:$z-index-header;
  // width
  width: 100%;
  height: 112px;
  // 此处通过@ media 来分开出处理 TODO
  min-width: 960px;
  max-width: 1280px;
  // fixed
  position: fixed;
  top: 0px;
  left: 0px;
  right:0px;
  padding: 0 16px;
  overflow: visible;
  .covid19-logo {
    background-image:url('../../assets/image/logo.svg');
    background-size: 100%;
    max-width: 342.02px;
    width: 32%;
    height: 50px;
  }

  .nav {
    .social {
      margin: 0 15px;

      .twitter {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../../assets/image/facebook.svg');
        mask-image: url('../../assets/image/facebook.svg');
      }
      .facebook {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../../assets/image/twitter.svg');
        mask-image: url('../../assets/image/twitter.svg');
      }
      .sharelink {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../../assets/image/sharelink.svg');
        mask-image: url('../../assets/image/sharelink.svg');
      }

      li{
        a {
          margin-left: 5px;
          margin-right: 5px;
          transition: color .3s ease;
          -webkit-transition: color .3s ease;
          background-color: $color-black;
        }
        a:hover{
          background-color: $color-blue;
        }
        a::after {
          border-bottom: $color-white;
          width: 0;
          background-color: $color-blue;
        }
        a:hover::after {
          width: 0;
        }
      }
    }
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
