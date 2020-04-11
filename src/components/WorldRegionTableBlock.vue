<template>
  <div id="WorldRegionTableBlock">
    <table class="world-region-table">
      <thead>
        <tr>
          <th class="region-column">国・地域</th>
          <th class="confirm-number-column">感染人数</th>
          <th class="recover-number-column">回復者数</th>
          <th class="death-number-column">死亡者数</th>
          <th class="rate-column">感染率</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="regionData in regionDatas"
          v-bind:key="regionData.region + index"
        >
          <td class="region-column">{{regionData.region}}</td>
          <td class="confirm-number-column">{{regionData.confirm.toLocaleString()}}</td>
          <td class="recover-number-column">{{regionData.recover.toLocaleString()}}</td>
          <td class="death-number-column">{{regionData.death.toLocaleString()}}</td>
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
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.000125,
        },
        {
          region: '愛知県',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00001689,
        },
        {
          region: '北海道',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000689,
        },
        {
          region: '大阪府',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000089,
        },
        {
          region: '神奈川県',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他１',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他２',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他３',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他４',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他５',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他６',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他７',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他８',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: 'その他９',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000009,
        },
        {
          region: '中国居住者',
          confirm: 1100,
          recover: 1100,
          dath: 1100,
          rate: 0.00000002,
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
            confirm: region.Sum,
            recover: region.Sum,
            death: region.Sum,
            // TODO 感染率を埋める
            rate: 0.00001689,
          };
          dataList.push(data);
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

#WorldRegionTableBlock {
  margin: 24px 0;

  @media (max-width: $break-point) {
    margin: 16px 0;
  }

  .world-region-table {
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
      @include noto-font-001em(16px, bold);
    }

    tbody td {
      padding-top: 8px;
      padding-bottom: 8px;

      @media (max-width: $break-point) {
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }

    tbody tr {
      border-bottom: 1px $color-palegray solid;
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
      height: 520px;
      overflow-y: auto;

      @media (max-width: $break-point) {
        height: 350px;
      }
    }
  }

  .region-column {
    min-width: 80px;
    padding-left: 8px;
    text-align: left;
    width: 999999px;
  }

  thead .region-column {
    color: $color-primary;
  }

  tbody .region-column {
    @include poppins-font-001em(16px, bold);
    @media (max-width: $break-point) {
      @include poppins-font-001em(10px, bold);
      padding-left: 0;
      min-width: 60px;
    }
  }

  .confirm-number-column {
    min-width: 90px;
    text-align: center;
    @include poppins-font-001em(16px, bold);

    @media (max-width: $break-point) {
      @include poppins-font-001em(10px, bold);
      text-align: right;
    }
  }

  .recover-number-column,
  .death-number-column {
    min-width: 90px;
    text-align: center;
    @include poppins-font-001em(16px, normal);

    @media (max-width: $break-point) {
      @include poppins-font-001em(10px, normal);
      text-align: right;
    }
  }

  thead .confirm-number-column {
    color: $color-red;
  }

  thead .recover-number-column {
    color: $color-green;
  }

  thead .death-number-column {
    color: $color-darkgray;
  }

  tbody .confirm-number-column {
    @media (max-width: $break-point) {
      min-width: 48px;
    }
  }

  tbody .recover-number-column,
  tbody .death-number-column {
    @include poppins-font-001em(16px, normal);
    @media (max-width: $break-point) {
      min-width: 48px;
      @include poppins-font-001em(10px, normal);
    }
  }

  .rate-column {
    min-width: 80px;
    padding-right: 8px;
    text-align: right;
    @include poppins-font-001em(16px, bold);

    @media (max-width: $break-point) {
      @include poppins-font-001em(10px, bold);
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
