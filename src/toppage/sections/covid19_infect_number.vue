<template>
  <div id="covid19-infect-number">
    <div class="infect-number-left flex-container-start">
      <DashBoardMedium request="daily" title="日本昨日感染人数"></DashBoardMedium>
      <DashBoardMedium request="dead" title="日本死亡人数"></DashBoardMedium>
    </div>
    <div class="infect-number-right flex-container-start">
      <DashBoardLarge></DashBoardLarge>
    </div>
    <div class="infect-number-text flex-container-start flex-direction-column">
      <div class="infect-number-text-bold">
        世界全感染人数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{normalizeWorldNum}}
      </div>
      <div class="infect-number-text-bold">
        ダイヤモンドプリンセス号感染人数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{normalizeDiamondNum}}
      </div>
      <div class="infect-number-text-gray">
        最終更新：{{updatedate}}
      </div>
    </div>
  </div>
</template>

<script>
import DashBoardMedium from '@/components/DashBoardMedium';
import DashBoardLarge from '@/components/DashBoardLarge';

export default {
  name: 'InfectNumber',
  components: {
    DashBoardMedium,
    DashBoardLarge,
  },
  data() {
    return {
      worldInfectNum: 99999,
      diamondInfectNum: 99999,
      updatedate: '2020年3月1日',
    };
  },
  computed: {
    normalizeWorldNum() {
      const { worldInfectNum } = this;
      return worldInfectNum.toLocaleString();
    },
    normalizeDiamondNum() {
      const { diamondInfectNum } = this;
      return diamondInfectNum.toLocaleString();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-infect-number {
  display: flex;
  height: 203px;
  margin: 16px 24px;
  margin-bottom: 32px;

  .infect-number-left {
    align-items: start;
    width: 50%;
  }

  .infect-number-right {
    align-items: start;
    width: 50%;
  }


  .infect-number-text {
    text-align: left;
    align-items: flex-start;
    position: absolute;
    padding-top: 121px;

    .infect-number-text-bold {
      @include noto-font-001em(14px, bold);
      margin-bottom: 8px;
    }
    .infect-number-text-gray {
      @include noto-font-001em(14px, normal);
      color: $color-lightgray;
    }
  }

  @media (max-width: $breakpoint-pc) {
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 16px 16px;
    margin-bottom: 32px;
    .infect-number-left {
      width: 100%;
    }
    .infect-number-right {
      width: 100%;
      display: block;
    }
    .infect-number-text {
      position:static;
      display: block;
      padding: 16px 16px;
    }
  }

  @media (max-width: $breakpoint-sp) {
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 16px 16px;
    .infect-number-left {
      display: block;
      width: 100%;
    }
    .infect-number-right {
      width: 100%;
      display: block;
    }
    .infect-number-text {
      position:static;
      display: block;
      padding: 16px 0;
    }

  }
}
</style>
