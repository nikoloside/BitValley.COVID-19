<template>
  <div id="covid19-pickup">
    <div class="wrap-pickup wrap-shadow flex-container-start">
      <div class="icon-pickup flex-container-start">
        <div class="icon-pickup-dot"></div>
        <div class="icon-pickup-title">PICKUP</div>
      </div>
      <div class="icon-pickup-text">
        <a :href="newsData[index].url"> {{newsData[index].title}}
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
    };
  },
  mounted() {
    const list = [];
    axios.get('https://api.github.com/repos/woshahua/issue_api/issues')
      .then((response) => {
        response.data.forEach((news) => {
          const data = {
            title: news.title,
            url: news.body,
          };
          list.push(data);
        });
        this.newsData = list;
      }).catch(() => {
        // 暫定的な対応
        list.push({
          title: '-',
          url: '/',
        });
      });
  },
  methods: {
    calcIndex(val) {
      this.index = Math.min(Math.max(this.index + val, 0), this.showNum);
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
      padding-top: 8px;
      padding-left:16px;
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
}

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
