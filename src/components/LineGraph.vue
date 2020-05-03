<template>
  <div id="LineGraph">
    <!-- 縦軸 -->
    <div class="unit-group">
        <div class="unit"
        v-for="unit in units" v-bind:key="unit"
        v-bind:style="{ height: `${100 / unitCount + 2 }%` }"
        >
            {{ unit }}
        </div>
    </div>

    <!-- グラフの内部 -->
    <div class="graph-wrapper">
        <!-- グラフの掛け線 -->
        <div
            class="unit-line"
            v-for="bottom in lineBottoms"
            v-bind:key="bottom"
            v-bind:style="{ bottom }"
        />

        <!-- データの描画空間 -->
        <div class="infect-data-group">
            <svg
            :viewBox="`0 0 ${graphWidth} ${graphHeight}`"
            preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="grad1" gradientTransform="rotate(90)">
                        <stop offset="0%" stop-color="#D2E2FF"/>
                        <stop offset="100%" stop-color="#D2E2FF" stop-opacity="0" />
                    </linearGradient>
                </defs>
                <polygon classe="infect-data-line"
                :points="`${polygonPoints} ${graphWidth*(1 - 0.5 / infectDatas.length)},
                ${graphHeight} ${graphWidth / 2 / infectDatas.length},${graphHeight}`"
                fill="url(#grad1)" />

                <line
                v-for="(infectFromData, index) in infectFromDatas"
                v-bind:key="index"
                :x1="`${graphWidth / 2 / infectDatas.length * (1 + index * 2)}`"
                :y1="`${graphHeight - infectFromData / units[0] * graphHeight}`"
                :x2="`${graphWidth / 2 / infectDatas.length * (3 + index * 2)}`"
                :y2="`${graphHeight - infectDatas[index+1].count/units[0]*graphHeight}`"
                style="stroke:#0452E6;" stroke-linecap="round" stroke-width="3" />
            </svg>
            <div class="today-circle"
            v-bind:style="{
              display:`${infectDatas[infectDatas.length-1]===0 ? 'none':'block'}`,
              right:`${50 / infectDatas.length-1}%`,
              top: `${100 - infectDatas[infectDatas.length-1].count
              / units[0] * 100 - 3}%` }">
            </div>

            <div
            class="infect-column"
              v-for="(label,index) in labelsCount"
              v-bind:key="index"
              v-bind:style="{ width: `${100 / labelsCount.length}%`,
              height: `${label / units[0] * 100}%`,
              left:`${100 / labelsCount.length * index}%`}"
            >
                <div class="infect-count">
                  <div class="infect-count-title">
                    {{labelsDate[index]}}{{$t(messages)}}
                  </div>
                  {{ label }}</div>
            </div>
        </div>

    </div>

    <!-- からのdivが必要です -->
    <div/>

    <!-- 横軸 -->
    <div class="infect-label-group">
        <div class="infect-label"
            v-for="(label, index) in labelsDate"
            v-bind:key="index"
            v-bind:style="{ width: `${100 / labelsDate.length}%` }"
        >
            {{label}}
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LineGraph',
  props: ['lineData', 'messagesName'],
  data() {
    return {
      unitCount: 8,
      labelCount: 9,
      infectDatas: [
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
        {
          date: '-',
          count: 1,
        },
      ],
      messages: 'messages.datajapanconfirm',
    };
  },
  watch: {
    lineData() {
      this.infectDatas = this.lineData;
    },
    messagesName() {
      this.messages = this.messagesName;
    },
  },
  computed: {
    graphWidth() {
      return 450;
    },
    graphHeight() {
      return 200;
    },
    normalizeTotalPersons() {
      const { TotalPersons } = this;
      return TotalPersons.toLocaleString();
    },
    normalizeDiffPersons() {
      const { DiffPersons } = this;
      let sign = '';
      if (DiffPersons > 0) {
        sign = '+';
      } else if (DiffPersons < 0) {
        sign = '';
      }
      return sign + DiffPersons.toLocaleString();
    },
    step() {
      const { infectDatas, unitCount } = this;
      const counts = infectDatas.map(({ count }) => count);
      const maxCount = Math.max(...counts);

      return Math.ceil(maxCount / (unitCount - 1) / 50) * 50;
    },
    lineBottoms() {
      const { unitCount } = this;
      // eslint-disable-next-line no-mixed-operators
      return [...Array(unitCount).keys()].map(i => `${i * 100 / (unitCount - 1)}%`);
    },
    units() {
      const { unitCount, step } = this;
      return [...Array(unitCount).keys()].map(i => i * step).reverse();
    },
    labelsCount() {
      const { infectDatas, labelCount } = this;
      const divide = infectDatas.length / labelCount;
      const offset = infectDatas.length % labelCount;
      return [...Array(labelCount).keys()].map(i =>
      // eslint-disable-next-line no-mixed-operators
        infectDatas[Math.floor(divide * i + offset)].count);
    },
    labelsDate() {
      const { infectDatas, labelCount } = this;
      const divide = infectDatas.length / labelCount;
      const offset = infectDatas.length % labelCount;
      return [...Array(labelCount).keys()].map(i =>
      // eslint-disable-next-line no-mixed-operators
        infectDatas[Math.floor(divide * i + offset)].date);
    },
    infectFromDatas() {
      const { infectDatas } = this;
      return [...Array(
        (infectDatas.length > 0) ? infectDatas.length - 1 : 0).keys(),
      ].map(i => infectDatas[i].count);
    },
    polygonPoints() {
      const { infectDatas, units, graphWidth, graphHeight } = this;
      return [...Array(infectDatas.length).keys()].map(
        // eslint-disable-next-line no-mixed-operators
        i => `${graphWidth / 2 * (1 + i * 2) / infectDatas.length},${graphHeight - infectDatas[i].count * graphHeight / units[0]}`).join(' ');
    },
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

#LineGraph {
  max-width: 960px;
  min-height: 230px;
  width: 100%;
  height: 278px;
  display: grid;
  grid-template-rows: 90% 24px;
  grid-template-columns:  18px  95%;
  gap: 4px 8px;
  padding: 24px 0;

  .unit-group {
    text-align: left;
    font-weight: bold;
    font-size: 10px;
    color: $color-gray;
    .unit {
        text-align: right;
        position:relative;
        top: -10px;
    }
  }
  .graph-wrapper {
      position: relative;
      width: 100%;
  }

  .unit-line {
      height: 1px;
      background-color: $color-palegray;
      position: absolute;
      right: 0;
      left: 0;
  }

  .infect-data-group {
    position: absolute;
    width: 100%;
    height: 100%;
    svg {
        height: 100%;
        width: 100%;
    }

    .today-circle {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 3px $color-navy;
        background-color:#fff;
    }
    .infect-column {
      position: absolute;
      bottom: 0;
      background-color: rgba(0,0,0,0);
      border-radius: 0px 0px 0px 0px;
      cursor: pointer;

      &:active,
      &:focus,
      &:hover {
        .infect-count {
            opacity: 0.6;
        }
      }
    }
    .infect-count {
      @include poppins-font-001em(12px, 500);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      opacity: 0;
      position: relative;
      left: -30px;
      width: 110px;
      height: 36px;
      transform: translateY(calc(-100% - 8px));
      background-color: $color-black;
      color: $color-white;
      text-align: center;
      box-sizing: border-box;
      margin: 4px auto;
      border-radius: 15px;
      pointer-events: none;
      transition: opacity .3s ease;
      word-break: break-all;
      border-radius: 4px;
      &-title {
        @include noto-font-001em(8px, 500);
        width: auto;
      }
    }
  }

  .infect-column {
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 0;
    background-color: $color-navy;
    border-radius: 4px 4px 0px 0px;
  }

  .infect-label-group {
    padding: 0 4px;
    display: flex;
  }

  .infect-label {
    font-weight: bold;
    font-size: 10px;
    color: $color-gray;
    text-align: center;
    padding: 0 4px;
    line-height: 1.1;

    @media (max-width: $breakpoint-sp) {
      word-wrap : break-word;
      overflow-wrap : break-word;
      font-size: 6px;
      padding: 0 0px;
    }
  }
}
</style>
