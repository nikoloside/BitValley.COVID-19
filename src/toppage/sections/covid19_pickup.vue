<template>
  <div id="covid19-pickup">
    <div class="wrap-pickup wrap-shadow flex-container-start">
      <div class="icon-pickup flex-container-start">
        <div class="icon-pickup-dot"></div>
        <div class="icon-pickup-title">PICKUP</div>
      </div>
      <div class="icon-pickup-text">
        <a :href="url"> {{title}}
          </a>
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
      msg: '这里是PickUp',
      title: '国内感染者が１０００人超え、医療機関や高齢者施設で広がる',
      url: 'https://headlines.yahoo.co.jp/hl?a=20200320-00050173-yom-soci',
    };
  },
  mounted() {
    axios.get('https://api.github.com/repos/woshahua/issue_api/issues')
      .then((response) => {
        const latestIssue = response.data;
        this.title = latestIssue[0].title;
        this.url = latestIssue[0].body;
      });
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
}
</style>
