<template>
  <transition name="spmodal" appear>
    <div class="spmodal spmodal-overlay">
      <div class="spmodal-window">
        <div class="spmodal-header" @click="$emit('close')">
        <router-link to="/" v-scroll-to="'#covid19-pickup'" class="covid19-logo">
        <img
          alt="「さよならコロナ」新型コロナウイルス事例チェックマップ"
          :src="$i18n.locale === 'ja' ?
          require('../assets/image/logo_white.png') :
          require('../assets/image/logocn_white@2x.png')"
          :srcset="$i18n.locale === 'ja' ?
          require('../assets/image/logo_white@2x.png') :
          require('../assets/image/logocn_white@4x.png')"
        />
        </router-link>
        </div>
        <div class="spmodal-content" @click="$emit('close')">
          <div class="sp-header-menu">
            <div class="sp-nav">
              <router-link to="/info" v-scroll-to="'#section-infect'">
                {{ $t("messages.headerinfectinfo") }}
              </router-link>
              <router-link to="/map" v-scroll-to="'#section-checkmap'">
                {{ $t("messages.headermap") }}
              </router-link>
              <router-link to="/news" v-scroll-to="'#covid19-article'">
                {{ $t("messages.headernews") }}
              </router-link>
            </div>
          </div>
          <div class="sp-language flex-container-spacebetween">
            <div class="sp-language-text">{{ $t("messages.headerswitchlang") }}</div>
            <div class="sp-language-button">
              <a
                v-on:click="onChangeToJapanese"
                v-bind:class="{ active: isLangJapanese }"
              >日本語</a>
              <div class="sp-border"></div>
              <a
                v-on:click="onChangeToChinese"
                v-bind:class="{ active: isLangChinese }"
              >中文</a>
            </div>
          </div>
          <div class="sp-footer">
            <div class="sp-footer-wrap">
            <div class="sp-footer-text">
              {{ $t("messages.headershare") }}
            </div>
            <SharePanel />
            <QuestionButton />
            <div class="sp-close-button">
              <div class="remove icon" />
              {{$t("messages.headerclose")}}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SharePanel from '@/components/SharePanel';
import QuestionButton from '@/components/QuestionButton';

export default {
  name: 'HeaderSpModal',
  components: {
    SharePanel,
    QuestionButton,
  },
  data() {
    return {
      langIndex: 0,
    };
  },
  created() {
    window.addEventListener('touchmove',
      event.preventDefault);
  },
  destroyed() {
    window.removeEventListener('touchmove',
      event.preventDefault);
  },
  computed: {
    isLangJapanese() {
      return this.$i18n.locale === 'ja';
    },
    isLangChinese() {
      return this.$i18n.locale === 'cn';
    },
  },
  methods: {
    onChangeToJapanese() {
      this.$i18n.locale = 'ja';
    },
    onChangeToChinese() {
      this.$i18n.locale = 'cn';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/commons/_variables.scss";

.spmodal {
  &.spmodal-overlay {
    display: block;
    position: fixed;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0,0,0);
    z-index: 40;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background:$color-navy;
    border-radius: 4px;
    overflow: auto;
    width: 100vw;
    height: 100vh;
  }

  &-content {
    overflow: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .sp-header-menu{
      .sp-nav{
        padding-top: 32px;
        text-align: center;
        @include noto-font-001em(18px, bold);
        line-height: 31px;

        a, a:visited{
          display: block;
          text-decoration: none;
          color: $color-white;
          margin-bottom: 28px;

          &.router-link-exact-active {
          color: $color-white;
          }
        }

        a {
          /* identical to box height */
          position: relative;
          transition: color .3s ease;
          -webkit-transition: color .3s ease;
          z-index: $z-index-over;
        }
        a:hover{
            color: rgba(255, 255, 255, 0.5);
        }
        a::after {
          border-bottom: solid 4px $color-white;
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

    .sp-footer{
      width: 100%;
      height: 252px;
      position: absolute;
      bottom: 0px;
      background-color: $color-white;
    }
    .sp-footer-wrap{
      display: flex;
      height: 70%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 30px;
    }
    .sp-footer-text{
      @include noto-font-001em(14px, bold);
      color: $color-black
    }
    .sp-close-button {
      @include poppins-font-001em(13px, 500);
      position: relative;
      cursor: pointer;
    }
    img{
      width: 100px;
      height: auto;
      padding-left: 9px;
    }
  }

  &-header {
    background-color: $color-navy;
    height: 50px;
    display: flex;
    padding-top: .5vw;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
  }
}

.covid19-logo {
  width: 217px;
  height: 36px;
  position: absolute;
  top: 18px;
  left: 16px;
  img {
    width: auto;
    height: 41px;
  }
  &:hover {
    opacity: 0.5;
  }

  @media (max-width: $breakpoint-sp) {
    img {
      width: auto;
      height: 36px;
    }
  }
}

// オーバーレイのトランジション
.spmodal-enter-active, .spmodal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .spmodal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.spmodal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.spmodal-enter, .spmodal-leave-to {
  opacity: 0;

  .spmodal-window {
    opacity: 0;
  }
}
// 言語sp
.sp-language {
  width: 100%;
  position: absolute;
  bottom: 252px;
  @include noto-font-001em(16px, bold);

  .sp-language-text {
    padding: 24px;
    color: $color-white;
  }
  .sp-language-button {
    display: flex;
    .sp-border {
      border-radius: 2px;
      border-left: solid 3px rgba(255, 255, 255, 0.5);
      margin: 0 16px;
    }
    a{
      cursor: pointer;
      color: rgba(255, 255, 255, 0.5);
      &:hover,
      &.active {
        color: $color-white;
      }
    }
    padding: 24px;
  }
}

.remove.icon {
  display: inline-block;
  color: #000;
  position: absolute;
  margin-left: 3px;
  margin-top: 10px;
  left: -20px;
  top: -1px;
}

.remove.icon:before {
  content: '';
  position: absolute;
  width: 15px;
  height: 1px;
  background-color: currentColor;
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
}

.remove.icon:after {
  content: '';
  position: absolute;
  width: 15px;
  height: 1px;
  background-color: currentColor;
  -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

</style>
