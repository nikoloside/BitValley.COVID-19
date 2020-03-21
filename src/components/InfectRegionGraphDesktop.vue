<template>
  <div id="InfectRegionGraphDesktop">
    <div class="unit-group">
      <div class="unit" v-for="(unit, index) in units" v-bind:key="unit + index">
        {{ unit }}人
      </div>
    </div>

    <div class="graph-wrapper">
      <div
        class="unit-line"
        v-for="(bottom, index) in lineBottoms"
        v-bind:key="bottom + index"
        v-bind:style="{ bottom }"
      />

      <div class="region-data-group">
        <div
          class="region-data"
          v-for="(regionData, index) in regionDatas"
          v-bind:key="regionData.region + index"
          v-bind:style="{ width: `${100 / regionDatas.length}%` }"
        >
          <div
            class="region-column"
            v-bind:style="{ height: `${regionData.count / units[0] * 100}%` }"
          >
            <div class="region-count">{{ regionData.count }}</div>
          </div>
        </div>
      </div>
    </div>

    <div/>

    <div class="region-label-group">
      <div class="region-label"
        v-for="(regionData, index) in regionDatas"
        v-bind:key="regionData.region + index"
        v-bind:style="{ width: `${100 / regionDatas.length}%` }"
      >
        {{regionData.region}}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InfectRegionGraphDesktop',
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
    axios.get('http://160.16.196.229:8080/api/patient/location')
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
    lineBottoms() {
      const { unitCount } = this;
      // eslint-disable-next-line no-mixed-operators
      return [...Array(unitCount - 1).keys()].map(i => `${i * 100 / (unitCount - 1)}%`);
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

#InfectRegionGraphDesktop {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 4px 8px;
  margin: 24px;

  .unit-group {
    @include noto-font-001em(10px, bold);
    text-align: left;
    color: $color-gray;
  }

  .graph-wrapper {
    position: relative;
  }

  .unit-line {
    height: 1px;
    background-color: $color-palegray;
    position: absolute;
    right: 0;
    left: 0;
  }

  .region-data-group {
    position: absolute;
    display: flex;
    top: 0;
    right: 4px;
    bottom: 0;
    left: 4px;
  }

  .region-data {
    position: relative;
  }

  .region-column {
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 0;
    background-color: $color-navy;
    border-radius: 4px 4px 0px 0px;
    cursor: pointer;

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
    width: 100%;
    top: 0;
    transform: translateY(calc(-100% - 8px));
    background-color: #757F8B;
    color: $color-white;
    text-align: center;
    box-sizing: border-box;
    padding: 4px 8px;
    border-radius: 15px;
    pointer-events: none;
    transition: opacity .3s ease;
    word-break: break-all;
  }

  .region-label-group {
    padding: 0 4px;
    display: flex;
  }

  .region-label {
    @include noto-font-001em(10px, bold);
    color: $color-gray;
    text-align: center;
    padding: 0 4px;
    line-height: 1.1;
  }
}
</style>
