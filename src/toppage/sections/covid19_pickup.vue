<template>
  <div id="covid19-pickup">
    <div class="wrap-pickup wrap-shadow flex-container-start">
      <div class="icon-pickup flex-container-start">
        <div class="icon-pickup-dot"></div>
        <div class="icon-pickup-title">PICKUP</div>
      </div>
      <div class="icon-pickup-text">
        <a
          v-bind:href="newsData[index].url"
          v-bind:class="{
            slideIn: isSlideIn,
            slideOut: isSlideOut,
            slideInReverse: isSlideInReverse,
            slideOutReverse: isSlideOutReverse
          }"
        >
          {{ $i18n.locale === 'ja' ? newsData[index].titleja : newsData[index].titlecn}}
        </a>
      </div>
      <div class="scroll-bar">
        <div class="scroll-upper" v-on:click="calcIndex(-1)"/>
        <div class="scroll-borderline"/>
        <div class="scroll-downer" v-on:click="calcIndex(1)"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PickUp',
  data() {
    return {
      newsData: [
        {
          title: '-',
          url: '/',
        },
      ],
      index: 0,
      showNum: 5,
      isSlideIn: false,
      isSlideOut: false,
      isSlideInReverse: false,
      isSlideOutReverse: false,
      isResetCount: false,
      isReverse: false,
    };
  },
  mounted() {
    const list = [];

    axios.get('https://x5f9uvu468.execute-api.ap-northeast-1.amazonaws.com/default/getNews')
      .then((response) => {
        // 暂时news放在local
        if (response.data.length < 1) {
          // 很么都没有的时候
          list.push({
            title: '-',
            url: '/',
          });
          return;
        }
        if (response.data[0].uid < response.data[response.data.length - 1].uid) {
          response.data.reverse();
        }
        response.data.forEach((news) => {
          const data = {
            titleja: news.titleja,
            titlecn: news.titlecn,
            // eslint-disable-next-line prefer-template
            url: news.link,
          };
          list.push(data);
        });
        this.newsData = list;
      });

    setTimeout(() => {
      this.countDownTimer();
    }, 5000);
  },
  methods: {
    calcIndex(val) {
      this.isResetCount = true;
      const nextIndex = Math.min(Math.max(this.index + val, 0), this.showNum);
      if (nextIndex !== this.index &&
      nextIndex < this.newsData.length &&
      nextIndex < this.showNum) {
        this.animateNextBegin(nextIndex, val < 0);
      }
    },
    animateNextBegin(nextIndex, isReserve) {
      this.isReverse = isReserve;
      if (this.isSlideIn ||
      this.isSlideOut ||
      this.isSlideInReverse ||
      this.isSlideOutReverse) {
        return;
      }
      if (this.isReverse) {
        this.isSlideOutReverse = true;
      } else {
        this.isSlideOut = true;
      }

      setTimeout(() => {
        this.animateNextEnd(nextIndex);
      }, 300);
    },
    animateNextEnd(nextIndex) {
      this.index = nextIndex;
      if (this.isReverse) {
        this.isSlideOutReverse = false;
        this.isSlideInReverse = true;
      } else {
        this.isSlideOut = false;
        this.isSlideIn = true;
      }

      setTimeout(() => {
        this.isSlideInReverse = false;
        this.isSlideIn = false;
      }, 300);
    },
    countDownTimer() {
      if (!this.isResetCount) {
        if (this.index >= this.newsData.length - 1 ||
        this.index >= this.showNum - 1) {
          this.animateNextBegin(0, false);
        } else {
          this.calcIndex(1);
        }
      }
      this.isResetCount = false;

      setTimeout(() => {
        this.countDownTimer();
      }, 5000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-pickup {
  display: flex;
  margin-top: 112px;
  @media (max-width: $breakpoint-pc) {
    margin-top: 130px;
  }
  @media (max-width: $breakpoint-sp) {
    margin-top: 72px;
  }
}

.wrap-pickup {
  width: 100%;
  height: 66px;
  margin: 24px 24px;
  position: relative;
  @media (max-width: $breakpoint-pc) {
    margin: 8px 16px;
    margin-top: 24px;
  }
  @media (max-width: $breakpoint-sp) {
    height: 144px;
    flex-direction: column;
    align-items: flex-start;
    margin: 8px 16px;
    margin-top: 24px;

    .icon-pickup {
      padding-top: 16px;
      padding-left: 16px;
      margin: 0;
    }

    .icon-pickup-text {
      margin-top: 8px;
      margin-left:16px;
      width: 263px;
    }
  }
}

.icon-pickup {
  margin: 0 24px;

  .icon-pickup-dot {
    width: 14px;
    height: 14px;
    background: $gradation-mix;
    box-shadow: $box-shadow-button;
    border-radius: 14px;
    transform: rotate(90deg);
    margin-right: 8px;
    z-index: $z-index-wrap;
  }
  .icon-pickup-title {
    @include poppins-font-001em(20px, bold);
    color: $color-pink
  }
}

.icon-pickup-text {
    @include noto-font-001em(16px, bold);
    padding-right: 64px;
    overflow: hidden;

    a {
      position: relative;
      top: 0px;
    }
}

// animation tag
@keyframes slideIn {
  from {
    top:-72px;
  }
  to {
    top:0px;
  }
}
@keyframes slideOut {
  from {
    top:0px;
  }
  to {
    top:72px;
  }
}

@keyframes slideInReverse {
  from {
    top:72px;
  }
  to {
    top:0px;
  }
}
@keyframes slideOutReverse {
  from {
    top:0px;
  }
  to {
    top:-72px;
  }
}

.slideIn {
  -webkit-animation: 0.3s linear 0s infinite alternate slideIn;
          animation: 0.3s linear 0s infinite alternate slideIn;
}
.slideOut {
  -webkit-animation: 0.3s linear 0s infinite alternate slideOut;
          animation: 0.3s linear 0s infinite alternate slideOut;
}
.slideInReverse {
  -webkit-animation: 0.3s linear 0s infinite alternate slideInReverse;
          animation: 0.3s linear 0s infinite alternate slideInReverse;
}
.slideOutReverse {
  -webkit-animation: 0.3s linear 0s infinite alternate slideOutReverse;
          animation: 0.3s linear 0s infinite alternate slideOutReverse;
}

// ui controller
.scroll-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  right: 16px;

  .scroll-upper {
    width: 7.2px;
    height: 7.2px;
    border-top: 1.5px solid #828E9F;;
    border-right: 1.5px solid #828E9F;
    border-radius: 1px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    cursor: pointer;
  }
  .scroll-borderline {
    width: 32px;
    border-radius: 1px;
    border-bottom: 2px solid #CED6E2;
    margin: 10px 0;
  }
  .scroll-downer {
    width: 7.2px;
    height: 7.2px;
    border-top: 1.5px solid #828E9F;;
    border-right: 1.5px solid #828E9F;
    border-radius: 1px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    cursor: pointer;
  }

}

</style>
