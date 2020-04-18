<template>
    <div id="DashBoardLarge" class="wrap-shadow">
        <div class="wrap-dashboard flex-container-spacebetween">
            <div class="DashBoardLeft flex-container-spacebetween flex-direction-column">
                <div class="DashBoardBlack">
                <div class="DashBoardTitle">
                    {{ BoardTitle }}
                </div>
                <div class="DashBoardNumberBlack">
                    {{ normalizeTotalPersons }}
                </div>
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
                         right:`${50 / infectDatas.length - 2}%`,
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
                            <div class="infect-count">{{ label }}</div>
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
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import increaseIcon from '../assets/image/increase.svg';
import decreaseIcon from '../assets/image/decrease.svg';
import equalizeIcon from '../assets/image/equalize.svg';

export default {
  name: 'DashBoardLarge',
  data() {
    return {
      BoardTitle: '日本感染人数',
      TotalPersons: 0,
      DiffPersons: 0,

      unitCount: 6,
      labelCount: 5,
      infectDatas: [
        {
          date: '03.17',
          count: 881,
        },
        {
          date: '03.18',
          count: 915,
        },
        {
          date: '03.19',
          count: 956,
        },
        {
          date: '03.20',
          count: 1010,
        },
        {
          date: '03.21',
          count: 1010,
        },
      ],
    };
  },
  mounted() {
    axios.get('https://api.survival-jp.com/api/patient/current')
      .then((response) => {
        this.TotalPersons = response.data.data.Current;
        this.DiffPersons = response.data.data.Diff;
      });
    const dataList = [];
    axios.get('https://api.survival-jp.com/api/patient/period')
      .then((response) => {
        response.data.data.forEach((patientByDate) => {
          const data = {
            date: patientByDate.Date,
            count: patientByDate.Confirmed,
          };
          dataList.push(data);
        });
      });
    this.infectDatas = dataList;
  },

  computed: {
    graphWidth() {
      return 283;
    },
    graphHeight() {
      return 143;
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

    @media (max-width: $breakpoint-sp) {
      height: 275px;
    }

    .wrap-dashboard {
        width: 100%;
        padding: 24px 24px;
        @media (max-width: $breakpoint-sp) {
          display: flex;
          flex-direction: column;;
          padding: 16px 24px;
        }
    }

    .DashBoardLeft {
        height: 100%;
        align-items: flex-start;
        margin-right: 16px;
        @media (max-width: $breakpoint-sp) {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          margin: 0px;

          .DashBoardTitle {
            @include noto-font-001em(14px, bold);
          }
          .DashBoardNumberBlack {
              @include poppins-font(24px, bold);
          }
        }

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
        @media (max-width: $breakpoint-sp) {
          height: 50%;
        }

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
            svg {
                height: 140px;
                width: 100%;
            }

            .today-circle {
                position: absolute;
                width: 6px;
                height: 6px;
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

                &:hover {
                .infect-count {
                    opacity: 1;
                }
                }
            }
            .infect-count {
                @include poppins-font(12px, 500);
                opacity: 0;
                position: absolute;
                width: 46px;
                height: 24px;
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
