<template>
  <div id="HeaderPcBlock"
  class="flex-container-spacebetween"
   v-bind:class="scrollY === true ? 'header-height-scroll' : 'header-height-top'"
  >
    <router-link to="/" v-scroll-to="'#covid19-pickup'" class="covid19-logo"
    >
    <img
      alt="「さよならコロナ」新型コロナウイルス事例チェックマップ"
      :src="$i18n.locale === 'ja' ?
      require('../assets/image/logo@2x.png') : require('../assets/image/logocn@2x.png')"
      :srcset="$i18n.locale === 'ja' ?
      require('../assets/image/logo@2x.png') : require('../assets/image/logocn@4x.png')"
    />
    </router-link>
    <div class="nav flex-container-spacebetween">
      <div class="nav-link flex-container-spacebetween">
        <li><router-link to="/info" v-scroll-to="'#section-infect'">
            {{ $t("messages.headerinfectinfo") }}
        </router-link></li>
        <li><router-link to="/map" v-scroll-to="'#section-checkmap'">
            {{ $t("messages.headermap") }}
        </router-link></li>
        <li><router-link to="/news" v-scroll-to="'#covid19-article'">
            {{ $t("messages.headernews") }}
        </router-link></li>
      </div>
      <div class="social flex-container-spacebetween">
        <div class="social-text">
            {{ $t("messages.headershare") }}
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
            <a
                aria-label="Weiboでシェアする"
                class="weibo"
                target="_blank"
                v-bind:href="weiboShareUrl"
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

export default {
  name: 'HeaderPcBlock',
  components: {
    SwitchLanguageButton,
  },
  data() {
    return {
      SHARE_URL: 'https://survival-jp.com',
      SHARE_TEXT: '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ',
      SHARE_TEXT_CN: 'https://survival-jp.com 「日本疫情指南」面向在日华人的日本新冠疫情信息网站——“日本疫情指南”, 查看日本新冠肺炎感染数据，还能通过地图来查找身边有没有感染病例，同时提供新冠肺炎相关新闻的更新，世界疫情发展数据。 #再见吧新冠菌 #日本疫情指南 #日本疫情',
      SHARE_PIC_CN: 'https://res.cloudinary.com/df6wesepg/image/upload/v1588696192/promotion/OGP_cn_j2ddbv.png',
      scrollY: 0,
    };
  },
  computed: {
    twitterShareUrl() {
      return `https://twitter.com/intent/tweet?${
        new URLSearchParams([['url', this.SHARE_URL], ['text', this.SHARE_TEXT]])
      }`;
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams([['u', this.SHARE_URL]])
      }`;
    },
    weiboShareUrl() {
      return `http://service.weibo.com/share/share.php?${
        new URLSearchParams([['url', this.SHARE_URL], ['title', this.SHARE_TEXT_CN]], ['pic', this.SHARE_PIC_CN])
      }`;
    },
  },
  methods: {
    handleScroll() {
      // Any code to be executed when the window is scrolled
      this.scrollY = window.scrollY > 90;
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
    max-width: 247px;
    width: 32%;
    height: 50px;
    margin-left: 16px;
    img {
      width: auto;
      height: 50px;
    }
    &:hover {
      opacity: 0.5;
    }
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
      .weibo {
        width: 24px;
        height: 24px;
        -webkit-mask-image: url('../assets/image/weibolink.svg');
        mask-image: url('../assets/image/weibolink.svg');
        mask-size: contain;
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

    .covid19-logo {
        position: absolute;
        width: 247px;
        top: 24px;
        left: 16px;
        margin-left: 0;

        img {
          width: auto;
          height: 50px;
        }

        &:hover {
          opacity: 0.5;
        }
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

.header-height-top {
  height: 112px;
  transition: 0.3s all ease 0s;
  @media (max-width: $breakpoint-pc) {
    height: 130px;
  }
}

.header-height-scroll {
  height: 74px;
  transition: 0.3s all ease 0s;
  @media (max-width: $breakpoint-pc) {
    height: 130px;
  }
}
</style>
