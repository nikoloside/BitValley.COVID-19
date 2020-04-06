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
        国内新肺炎回復者数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{normalizeRecoveredNum}}
      </div>
      <div class="infect-number-text-bold">
        国内新肺炎検査実施数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{normalizeTestedNum}}
      </div>
      <div class="infect-number-text-gray">
        <UpdateAtLabel v-bind:update-at="updatedate" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashBoardMedium from '@/components/DashBoardMedium';
import DashBoardLarge from '@/components/DashBoardLarge';
import UpdateAtLabel from '@/components/UpdateAtLabel';

export default {
  name: 'InfectNumber',
  components: {
    DashBoardMedium,
    DashBoardLarge,
    UpdateAtLabel,
  },
  data() {
    return {
      recoveredNum: 235,
      testedNum: 20228,
      updatedate: '2020年3月22日',
    };
  },
  mounted() {
    axios.get('http://covid-info.site:8080/api/patient/latest')
      .then((response) => {
        this.recoveredNum = response.data.data.Recovered;
        this.testedNum = response.data.data.Tested;
      }).catch(() => {
        // 暫定的な対応
        this.recoveredNum = 235;
        this.testedNum = 20228;
      });

    axios.get('http://covid-info.site:8080/api/patient/updateTime')
      .then((response) => {
        this.updatedate = response.data.data.PatientDataUpdateTime;
      }).catch(() => {
        // 暫定的な対応
        this.updatedate = new Date(Date.now() - 864e5);
      });
  },
  computed: {
    normalizeRecoveredNum() {
      const { recoveredNum } = this;
      return recoveredNum.toLocaleString();
    },
    normalizeTestedNum() {
      const { testedNum } = this;
      return testedNum.toLocaleString();
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
