<template>
  <div id="InfectRegionTableBlock">
    <table class="infect-region-table">
      <thead>
        <tr>
          <th class="region-column">{{ $t("messages.datajapanregion") }}</th>
          <th class="count-graph-column"></th>
          <th class="count-number-column">{{ $t("messages.datajapanconfirm") }}</th>
          <th class="rate-column">{{ $t("messages.datajapanconfirmrate") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(regionData, index) in regionDatas"
          v-bind:key="regionData.region + index"
        >
          <td class="region-column">{{regionData.region}}</td>
          <td class="count-graph-column">
            <div
              class="count-graph"
              v-bind:style="{
                width: `${regionData.count / maxCount * 100}%`,
              }"
            />
          </td>
          <td class="count-number-column">{{regionData.count.toLocaleString()}}</td>
          <td class="rate-column">{{Math.ceil(regionData.rate * 10000000) / 100000}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InfectRegionTableBlock',
  data() {
    return {
      regionDatas: [
        {
          region: '東京都',
          count: 1100,
          rate: 0.000125,
        },
        {
          region: '愛知県',
          count: 500,
          rate: 0.00001689,
        },
        {
          region: '北海道',
          count: 200,
          rate: 0.00000689,
        },
        {
          region: '大阪府',
          count: 59,
          rate: 0.00000089,
        },
        {
          region: '神奈川県',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他１',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他２',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他３',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他４',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他５',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他６',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他７',
          count: 35,
          rate: 0.00000009,
        },
        {
          region: 'その他８',
          count: 20,
          rate: 0.00000009,
        },
        {
          region: 'その他９',
          count: 10,
          rate: 0.00000009,
        },
        {
          region: '中国居住者',
          count: 3,
          rate: 0.00000002,
        },
      ],
    };
  },
  mounted() {
    const dataList = [];
    axios.get('https://api.survival-jp.com/api/patient/location')
      .then((response) => {
        response.data.data.forEach((region) => {
          if (region.Location !== '不明' && region.Location !== '空港検疫') {
            const data = {
              region: region.Location,
              count: region.Sum,
              rate: region.InfectionRate,
            };
            dataList.push(data);
          }
        });
      });
    this.regionDatas = dataList;
  },
  computed: {
    maxCount() {
      return Math.max(...this.regionDatas.map(({ count }) => count));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
$break-point: 480px;

#InfectRegionTableBlock {
  margin: 24px 0;

  @media (max-width: $break-point) {
    margin: 16px 0;
  }

  .infect-region-table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    thead, tbody {
      display: block;
    }

    thead {
      background-color: $color-palegray;
      border-radius: 4px;
    }

    thead th {
      padding-top: 5px;
      padding-bottom: 5px;
      @include noto-font-001em(14px, bold);
    }

    tbody td {
      padding-top: 8px;
      padding-bottom: 8px;
      @include noto-font-001em(14px, bold);

      @media (max-width: $break-point) {
        @include noto-font-001em(10px, bold);
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }

    tbody tr:first-child td {
      padding-top: 16px;

      @media (max-width: $break-point) {
        padding-top: 8px;
      }
    }

    tbody tr:last-child td {
      padding-bottom: 16px;

      @media (max-width: $break-point) {
        padding-bottom: 8px;;
      }
    }

    tbody {
      height: 250px;
      overflow-y: auto;

      @media (max-width: $break-point) {
        height: 210px;
      }
    }
  }

  .region-column {
    min-width: 80px;
    padding-left: 8px;
    text-align: left;
  }

  thead .region-column {
    color: $color-primary;
  }

  tbody .region-column {
    @media (max-width: $break-point) {
      padding-left: 0;
      min-width: 60px;
    }
  }

  .count-graph-column {
    width: 999999px;
  }

  .count-number-column {
    min-width: 90px;
    text-align: center;

    @media (max-width: $break-point) {
      text-align: right;
    }
  }

  thead .count-number-column {
    color: $color-red;
  }

  tbody .count-number-column  {
    @media (max-width: $break-point) {
      min-width: 48px;
    }
  }

  .rate-column {
    min-width: 80px;
    padding-right: 8px;
    text-align: right;

    @media (max-width: $break-point) {
      min-width: 60px;
    }
  }

  .count-graph {
    height: 16px;
    border-radius: 0 4px 4px 0;
    background-color: $color-primary;
  }
}
</style>
