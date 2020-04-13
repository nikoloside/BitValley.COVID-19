<template>
  <transition name="spmodal" appear>
    <div class="spmodal spmodal-overlay">
      <div class="spmodal-window">
        <div class="spmodal-header">
          <div class="covid19-logo">
          </div>
        </div>
        <div class="spmodal-content" @click="$emit('close')">
          <div class="sp-header-menu">
            <div class="sp-nav">
              <a href="#" v-scroll-to="'#section-infect'">感染情報</a>
              <a href="#" v-scroll-to="'#section-news'">ニュース</a>
              <a href="#" v-scroll-to="'#section-comparison'">症状比較</a>
              <a href="#" v-scroll-to="'#section-measure'">予防対策</a>
            </div>
          </div>
          <div class="sp-footer">
            <div class="sp-footer-wrap">
            <div class="sp-footer-text">
              シェア
            </div>
            <SharePanel />
            <QuestionButton />
            <div class="sp-close-button">
              × 閉じる
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
  created() {
    window.addEventListener('touchmove',
      event.preventDefault);
  },
  destroyed() {
    window.removeEventListener('touchmove',
      event.preventDefault);
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
            color: $color-blue;
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
  background-image:url('../assets/image/logo_white.png');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 227px;
  height: 36px;
  position: absolute;
  top: 18px;
  left: 16px;
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
</style>
