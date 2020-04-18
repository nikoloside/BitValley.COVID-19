<template>
  <div id="WorldRegionTableBlock">
    <table class="world-region-table">
      <thead>
        <tr>
          <th class="region-column">{{ $t("messages.datacountryregion") }}</th>
          <th class="confirm-number-column">{{ $t("messages.datajapanconfirm") }}</th>
          <th class="recover-number-column">{{ $t("messages.datajapanrecover") }}</th>
          <th class="death-number-column">{{ $t("messages.datajapandeath") }}</th>
          <th class="rate-column">{{ $t("messages.datadeathrate") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(regionData, index) in regionDatas"
          v-bind:key="regionData.region + index"
        >
          <td class="region-column">{{ $t('messages.' + regionData.region.replace('\'', '')) }}</td>
          <td class="confirm-number-column">{{regionData.confirm.toLocaleString()}}</td>
          <td class="recover-number-column">{{regionData.recover.toLocaleString()}}</td>
          <td class="death-number-column">{{regionData.death.toLocaleString()}}</td>
          <td class="rate-column">{{Math.ceil(regionData.rate * 100000) / 1000}}%</td>
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
          region: 'Japan',
          confirm: 0,
          recover: 0,
          death: 0,
          rate: 0.000,
        },
      ],
    };
  },
  mounted() {
    const dataList = [];
    axios.get('https://api.survival-jp.com/api/patient/global/country')
      .then((response) => {
        response.data.data.forEach((region) => {
          const data = {
            region: region.Location,
            confirm: region.Confirmed,
            recover: region.Recovered,
            death: region.Deaths,
            rate: region.DeathRate,
          };
          dataList.push(data);
        });
      }).catch(() => {
        // 暫定的な対応
        const data = {
          region: '-',
          confirm: '-',
          recover: '-',
          death: '-',
          rate: '-',
        };
        dataList.push(data);
      });
    this.regionDatas = dataList;
  },
  methods: {
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

      @media (max-width: $break-point) {
        @include noto-font-001em(10px, bold);
      }
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
    @media (max-width: $break-point) {
      @include poppins-font-001em(10px, bold);
      padding-left: 0;
      min-width: 60px;
    }
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
      min-width: 60px;
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
      min-width: 60px;
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
      min-width: 60px;
    }
  }

  tbody .recover-number-column,
  tbody .death-number-column {
    @include poppins-font-001em(16px, normal);
    @media (max-width: $break-point) {
      min-width: 60px;
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
