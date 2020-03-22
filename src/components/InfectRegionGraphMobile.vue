<template>
  <div id="InfectRegionGraphMobile">
    <div />

    <div class="unit-group">
      <div
        class="unit"
        v-for="(unit, index) in units"
        v-bind:key="unit + index"
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
        v-for="(regionData, index) in regionDatas"
        v-bind:key="regionData.region + index"
      >
        {{regionData.region}}
      </div>
    </div>

    <div class="graph-wrapper">
      <div
        class="unit-line"
        v-for="(left, index) in lineLefts"
        v-bind:key="left + index"
        v-bind:style="{ left }"
      />

      <a
        href="javascript:void(0);"
        class="region-column"
        v-for="(regionData, index) in regionDatas"
        v-bind:key="regionData.region + index"
        v-bind:style="{ width: `${regionData.count / units[0] * 100}%` }"
      >
        <div
          class="region-count"
          v-bind:class="{ 'region-bind-top': regionData.count / step > unitCount - 2 }"
        >
          {{ regionData.count }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
  mounted() {
    const dataList = [];
    axios.get('http://covid-info.site:8080/api/patient/location')
      .then((response) => {
        response.data.data.forEach((region) => {
          const data = {
            region: region.Location,
            count: region.Sum,
          };
          dataList.push(data);
        });
      });
    this.regionDatas = dataList;
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
    @include noto-font-001em(10px, bold);
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
    display: block;
    position: relative;
    margin: 8px 0;
    height: 15px;
    background-color: $color-navy;
    border-radius: 0 4px 4px 0px;

    &:hover {
      .region-count {
        opacity: 1;
      }
    }
  }

  .region-count {
    @include noto-font-001em(12px, normal);
    opacity: 0;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(calc(100% + 4px), -50%);
    background-color: #757F8B;
    color: $color-white;
    text-align: center;
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 15px;
    pointer-events: none;
    transition: opacity .3s ease;

    &.region-bind-top {
      top: 0;
      transform: translateY(calc(-100% - 2px));
    }
  }

  .unit-group {
    position: relative;
    height: 20px;
  }

  .unit {
    @include noto-font-001em(10px, bold);
    top: 0;
    position: absolute;
    color: $color-gray;
    text-align: right;
  }
}
</style>

