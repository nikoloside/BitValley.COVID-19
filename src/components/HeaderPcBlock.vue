<template>
  <div id="HeaderPcBlock" class="flex-container-spacebetween">
    <a class="covid19-logo" href='/'>
    </a>
    <div class="nav flex-container-spacebetween">
      <div class="nav-link flex-container-spacebetween">
        <li><a href="#" v-scroll-to="'#section-infect'">
            {{ $t("messages.headerinfectinfo") }}
        </a></li>
        <li><a href="#" v-scroll-to="'#section-news'">
            {{ $t("messages.headernews") }}
        </a></li>
        <li><a href="#" v-scroll-to="'#section-comparison'">
            {{ $t("messages.headercompare") }}
        </a></li>
        <li><a href="#" v-scroll-to="'#section-measure'">
            {{ $t("messages.headermeasure") }}
        </a></li>
      </div>
      <div class="social flex-container-spacebetween">
        <div class="social-text">
            シェア
        </div>
        <li>
            <a
                aria-label="Twitterでシェアする"
                class="twitter"
                target="_blank"
                v-bind:href="twitterShareUrl"
            />
        </li>
        <li>
            <a
                aria-label="Facebookでシェアする"
                class="facebook"
                target="_blank"
                v-bind:href="facebookShareUrl"
            />
        </li>
        <li>
            <button
                aria-label="URLをコピーする"
                type="button"
                class="link-copy-button"
                v-on:click="onLinkCopyButtonClick"
            />
        </li>
      </div>
      <div class="question">
        <SwitchLanguageButton></SwitchLanguageButton>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchLanguageButton from '@/components/SwitchLanguageButton';
import clipboard from 'clipboard-polyfill';

const SHARE_URL = 'http://covid-info.site/';
const SHARE_TEXT = '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて見るサイト #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ';

export default {
  name: 'HeaderPcBlock',
  components: {
    SwitchLanguageButton,
  },
  data() {
    return {
      scrollY: true,
    };
  },
  computed: {
    twitterShareUrl() {
      return `https://twitter.com/intent/tweet?${
        new URLSearchParams([['url', SHARE_URL], ['text', SHARE_TEXT]])
      }`;
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams([['u', SHARE_URL]])
      }`;
    },
  },
  methods: {
    async onLinkCopyButtonClick() {
      await clipboard.writeText(SHARE_URL);
      // eslint-disable-next-line no-alert
      alert('URLをコピーしました');
    },
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

#HeaderPcBlock {
  background-color: $color-background;
  z-index:$z-index-header;
  // width
  width: 100%;
  height: 112px;
  // fixed
  position: fixed;
  top: 0px;
  left: 0px;
  right:0px;
  overflow: visible;
  @media (max-width: $breakpoint-sp) {
      display: none;
  }
  .covid19-logo {
    background-image:url('../assets/image/logo.svg');
    background-size: 100%;
    background-repeat: no-repeat;
    max-width: 342.02px;
    width: 32%;
    height: 50px;
    margin-left: 16px;
  }

  .nav {
    margin-right: 16px;
    .social {
      margin: 0 15px;
      .social-text {
        display: flex;
        @include noto-font-001em(12px, bold);
        color: $color-black;
        display: none;
        @media (max-width: $breakpoint-pc) {
            display: flex;
            margin-right: 1px;
        }
      }
      .twitter {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../assets/image/twitter.svg');
        mask-image: url('../assets/image/twitter.svg');
      }
      .facebook {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../assets/image/facebook.svg');
        mask-image: url('../assets/image/facebook.svg');
      }
      .link-copy-button {
        display: block;
        width: 30px;
        height: 30px;
        background-color: $color-black;
        -webkit-mask-size: cover;
        mask-size: cover;
        transition: background-color .3s ease;

        &:hover {
        background-color: $color-blue;
        }
        -webkit-mask-image: url('../assets/image/sharelink.svg');
        mask-image: url('../assets/image/sharelink.svg');
        border: none;
        padding: 0;
        cursor: pointer;
        appearance: none;
      }
      .nav-link {
        width: 100%;
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

  @media (max-width: $breakpoint-pc) {
    height: 130px;

    .covid19-logo {
        position: absolute;
        min-width: 300px;
        top: 24px;
        left: 16px;
        margin-left: 0;
    }
    .question {
        position: absolute;
        top: 24px;
        right: 16px;
    }
    .nav-link {
        position: absolute;
        left: 16px;
        bottom: 24px;
    }
    .social {
        position: absolute;
        width: 140px;
        right: -3px;
        bottom: 28px;
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
      z-index: $z-index-button;

      @media (max-width: $breakpoint-pc) {
          font-size: 14px;
          margin: 0 8px;
      }
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
