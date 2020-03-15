<template>
    <div id="DashBoardLarge" class="wrap-shadow">
        <div class="wrap-dashboard flex-container-spacebetween">
            <div class="DashBoardLeft flex-container-spacebetween flex-direction-column">
                <div class="DashBoardTitle">
                    {{ BoardTitle }}
                </div>
                <div class="DashBoardNumberBlack">
                    {{ normalizeTotalPersons }}
                </div>

                <div class="DashBoardDiff flex-container-start">
                    <div
                    class="DashBoardNumberColor"
                    v-bind:style="{ 'color': `${ diffColor }` }"
                    >
                        {{ normalizeDiffPersons }}
                    </div>
                    <div class="DashBoardIcon">
                        <img :src="diffIcon">
                    </div>
                </div>
            </div>

            <div class="DashBoardRight">

                <!-- 縦軸 -->
                <div class="unit-group">
                    <div class="unit"
                    v-for="unit in units" v-bind:key="unit"
                    v-bind:style="{ height: `${100 / unitCount+3 }%` }"
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
                        width='100%'
                        height='100%'
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        >
                            <line
                            v-for="(infectFromData, index) in infectFromDatas"
                            v-bind:key="index"
                            :x1="`${50 / infectDatas.length * (1 + index * 2)}`"
                            :y1="`${100 - infectFromData / units[0] * 100}`"
                            :x2="`${50 / infectDatas.length * (3 + index * 2)}`"
                            :y2="`${100 - infectDatas[index + 1].count / units[0] * 100}`"
                            style="stroke:#0452E6;" stroke-linecap="round" stroke-width="2" />

                            <defs>
                                <linearGradient id="grad1">
                                    <stop offset="0%" stop-color="#D2E2FF"/>
                                    <stop offset="100%" stop-color="#D2E2FF" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                            <polygon classe="infect-data-line"
                            points="60,20 100,40 100,80 60,100 20,80 20,40" fill="url(#grad1)" />
                        </svg>
                    </div>

                </div>

                <div/>

                <!-- 横軸 -->
                <div class="infect-label-group">
                    <div class="infect-label"
                        v-for="infectData in infectDatas"
                        v-bind:key="infectData.date"
                        v-bind:style="{ width: `${100 / infectDatas.length}%` }"
                    >
                        {{infectData.date}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import increaseIcon from '../assets/image/increase.svg';
import decreaseIcon from '../assets/image/decrease.svg';
import equalizeIcon from '../assets/image/equalize.svg';

export default {
  name: 'DashBoardLarge',
  data() {
    return {
      BoardTitle: '日本感染人数',
      TotalPersons: 9999,
      DiffPersons: -9999,

      unitCount: 6,
      infectDatas: [
        {
          date: '03.01',
          count: 110,
        },
        {
          date: '03.02',
          count: 96,
        },
        {
          date: '03.03',
          count: 62,
        },
        {
          date: '03.04',
          count: 59,
        },
        {
          date: '03.05',
          count: 59,
        },
      ],
    };
  },
  computed: {
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
    diffColor() {
      const { DiffPersons } = this;
      if (DiffPersons > 0) {
        return '#FA5292';
      } else if (DiffPersons < 0) {
        return '#31D9A5';
      }
      return '#0452E6';
    },
    diffIcon() {
      const { DiffPersons } = this;
      if (DiffPersons > 0) {
        return increaseIcon;
      } else if (DiffPersons < 0) {
        // eslint-disable-next-line global-require
        return decreaseIcon;
      }
      // eslint-disable-next-line global-require
      return equalizeIcon;
    },
    step() {
      const { infectDatas, unitCount } = this;
      const counts = infectDatas.map(({ count }) => count);
      const maxCount = Math.max(...counts);

      return Math.ceil(maxCount / (unitCount - 1) / 10) * 10;
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
    infectFromDatas() {
      const { infectDatas } = this;
      return [...Array(infectDatas.length - 1).keys()].map(i => infectDatas[i].count);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#DashBoardLarge {
    display: flex;
    background-color: $color-background;
    border-radius: 12px;
    min-width: 206px;
    width: 100%;
    height: 203px;
    margin: 0 12px;

    @media (max-width: $breakpoint-sp) {
        height: 275px;
    }

    .wrap-dashboard {
        width: 100%;
        padding: 24px 24px;
    }

    .DashBoardLeft {
        height: 100%;
        align-items: flex-start;
        margin-right: 16px;

        .DashBoardTitle {
            @include noto-font-001em(24px, bold);
            color: $color-black;
            text-align: left;
            width: 152px;
        }

        .DashBoardNumberBlack {
            @include poppins-font(40px, bold);
            color: $color-black;
            position: relative;
            top: -16px;
        }

        .DashBoardDiff {

            .DashBoardNumberColor {
                @include poppins-font(16px, bold);
                color: $color-pink;
            }

            .DashBoardIcon {
                width: 38px;
                height: 24px;
                img {
                    width: 100%;
                    height: auto
                }
            }

        }
    }

    .DashBoardRight {
        max-width: 385px;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 90% 24px;
        grid-template-columns:  18px  90%;
        gap: 4px 8px;

        .unit-group {
            text-align: left;
            font-weight: bold;
            font-size: 10px;
            color: $color-gray;

            .unit {
                text-align: right;
                position:relative;
                top: -5px;
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
        }

        .infect-data-line {
            background: linear-gradient(180deg, #D2E2FF 0%, rgba(210, 226, 255, 0) 100%);
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
        }
    }
}
</style>
