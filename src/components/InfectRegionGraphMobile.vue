<template>
  <div id="InfectRegionGraphMobile">
    <div />

    <div class="unit-group">
      <div
        class="unit"
        v-for="(unit, index) in units"
        v-bind:key="unit"
        v-bind:style="{
          right: `${100 / (units.length - 1) * index}%`,
          width: `${100 / (units.length - 1)}%`,
        }"
      >
        {{ unit }}人
      </div>
    </div>

    <div class="region-label-group">
      <div class="region-label"
        v-for="regionData in regionDatas"
        v-bind:key="regionData.region"
      >
        {{regionData.region}}
      </div>
    </div>

    <div class="graph-wrapper">
      <div
        class="unit-line"
        v-for="left in lineLefts"
        v-bind:key="left"
        v-bind:style="{ left }"
      />

      <div
        class="region-column"
        v-for="regionData in regionDatas"
        v-bind:key="regionData.region"
        v-bind:style="{ width: `${regionData.count / units[0] * 100}%` }"
      >
        <div class="region-count">{{ regionData.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfectRegionGraphMobile',
  data() {
    return {
      unitCount: 7,
      regionDatas: [
        {
          region: '北海道',
          count: 110,
        },
        {
          region: '愛知県',
          count: 96,
        },
        {
          region: '東京都',
          count: 62,
        },
        {
          region: '大阪府',
          count: 59,
        },
        {
          region: '神奈川県',
          count: 35,
        },
        {
          region: 'その他１',
          count: 35,
        },
        {
          region: 'その他２',
          count: 35,
        },
        {
          region: 'その他３',
          count: 35,
        },
        {
          region: 'その他４',
          count: 35,
        },
        {
          region: 'その他５',
          count: 35,
        },
        {
          region: 'その他６',
          count: 35,
        },
        {
          region: 'その他７',
          count: 35,
        },
        {
          region: 'その他８',
          count: 20,
        },
        {
          region: 'その他９',
          count: 10,
        },
        {
          region: '中国居住者',
          count: 3,
        },
      ],
    };
  },
  computed: {
    step() {
      const { regionDatas, unitCount } = this;
      const counts = regionDatas.map(({ count }) => count);
      const maxCount = Math.max(...counts);

      return Math.ceil(maxCount / (unitCount - 1) / 10) * 10;
    },
    lineLefts() {
      const { unitCount } = this;
      // eslint-disable-next-line no-mixed-operators
      return [...Array(unitCount).keys()].map(i => `${i * 100 / (unitCount - 1)}%`);
    },
    units() {
      const { unitCount, step } = this;
      return [...Array(unitCount).keys()].map(i => i * step).reverse();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

#InfectRegionGraphMobile {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 0 4px;
  margin: 24px;

  .region-label {
    font-weight: bold;
    font-size: 10px;
    color: $color-gray;
    text-align: left;
    margin: 8px 0;
  }

  .graph-wrapper {
    position: relative;
  }

  .unit-line {
    position: absolute;
    width: 1px;
    background-color: $color-palegray;
    top: 0;
    bottom: 0;
  }

  .region-column {
    position: relative;
    margin: 8px 0;
    height: 15px;
    background-color: $color-navy;
    border-radius: 0 4px 4px 0px;
    cursor: pointer;

    &:hover {
      .region-count {
        opacity: 1;
      }
    }
  }

  .region-count {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(calc(-100% - 2px));
    background-color: #757F8B;
    color: $color-white;
    text-align: center;
    font-size: 12px;
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 15px;
    pointer-events: none;
    transition: opacity .3s ease;
  }

  .unit-group {
    position: relative;
    height: 20px;
  }

  .unit {
    top: 0;
    position: absolute;
    font-weight: bold;
    font-size: 10px;
    color: $color-gray;
    text-align: right;
  }
}
</style>

