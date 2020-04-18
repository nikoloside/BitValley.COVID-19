<template>
  <div id="covid19-infect-number">
    <p class="additional-topinfo">
      <UpdateTimeLabel v-bind:update-time="updateAt" />
    </p>
    <div class="infect-info-panel">
      <ul>
        <li>
        <LineGraphTab
          id="infect-confirm-link"
          api-id="infect-confirm"
          bg-class="lt"
          label="messages.datajapanconfirm"
          v-bind:is-active="isConfirmTabActive"
          v-bind:on-click="onConfirmTabClick"
          v-bind:total-persons= "totalConfirmed"
          v-bind:diff-persons= "newConfirmed"
        />
        </li>
        <li>
        <LineGraphTab
          id="infect-death-link"
          api-id="infect-death"
          bg-class="ct"
          label="messages.datajapandeath"
          v-bind:is-active="isDeathTabActive"
          v-bind:on-click="onDeathTabClick"
          v-bind:total-persons= "totalDeaths"
          v-bind:diff-persons= "newDeaths"
        />
        </li>
        <li>
        <LineGraphTab
          id="infect-recover-link"
          api-id="infect-recover"
          bg-class="rt"
          label="messages.datajapanrecover"
          v-bind:is-active="isRecoverTabActive"
          v-bind:on-click="onRecoverTabClick"
          v-bind:total-persons= "totalRecovered"
          v-bind:diff-persons= "newRecovered"
        />
        </li>
      </ul>
      <ul>
        <li>
        <LineGraphTab
          id="none-confirm-link"
          api-id="none-confirm"
          bg-class="lb"
          label="messages.datanoneconfirm"
          v-bind:is-active="isNoneConfirmTabActive"
          v-bind:on-click="onNoneConfirmTabClick"
          v-bind:total-persons= "0"
          v-bind:diff-persons= "0"
        />
        </li>
        <li>
        <LineGraphTab
          id="heavy-confirm-link"
          api-id="heavy-confirm"
          bg-class="cb"
          label="messages.dataheavyconfirm"
          v-bind:is-active="isHeavyConfirmTabActive"
          v-bind:on-click="onHeavyConfirmTabClick"
          v-bind:total-persons= "totalCritical"
          v-bind:diff-persons= "newCritical"
        />
        </li>
        <li>
        <LineGraphTab
          id="pcr-test-link"
          api-id="pcr-test"
          bg-class="rb"
          label="messages.datapcrtest"
          v-bind:is-active="isPCRTestTabActive"
          v-bind:on-click="onPCRTestTabClick"
          v-bind:total-persons= "totalTested"
          v-bind:diff-persons= "newTested"
        />
        </li>
      </ul>
    </div>
    <div class="infect-info-graph">
      <LineGraph/>
    </div>
    <p class="additional-info">
      <UpdateAtLabel v-bind:update-at="updateAt" />
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import LineGraph from '@/components/LineGraph';
import LineGraphTab from '@/components/LineGraphTab';
import UpdateAtLabel from '@/components/UpdateAtLabel';
import UpdateTimeLabel from '@/components/UpdateTimeLabel';

const TAB = {
  CONFIRM: 'confirm',
  DEATH: 'death',
  RECOVER: 'recover',
  NONECONFIRM: 'noneconfirm',
  HEAVYCONFIRM: 'heavyconfirm',
  PCRTEST: 'pcrtest',
};

export default {
  name: 'InfectNumber',
  components: {
    LineGraph,
    LineGraphTab,
    UpdateAtLabel,
    UpdateTimeLabel,
  },
  data() {
    return {
      activeTab: TAB.CONFIRM,
      updatedate: '-',
      totalConfirmed: 0,
      newConfirmed: 0,
      totalCritical: 0,
      newCritical: 0,
      totalDeaths: 0,
      newDeaths: 0,
      totalRecovered: 0,
      newRecovered: 0,
      totalTested: 0,
      newTested: 0,
      updateAt: new Date(),
    };
  },
  mounted() {
    axios.get('https://api.survival-jp.com/api/patient/latest')
      .then((response) => {
        const data = response.data.data;
        this.totalConfirmed = data.Confirmed;
        this.totalDeaths = data.Dead;
        this.totalRecovered = data.Recovered;
        this.totalCritical = data.Critical;
        this.totalTested = data.Tested;
      });

    axios.get('https://api.survival-jp.com/api/patient/updateTime')
      .then((response) => {
        this.updateAt = new Date(response.data.data.PatientDataUpdateTime);
      }).catch(() => {
        // 暫定的な対応
        this.updateAt = new Date('-');
      });
  },
  computed: {
    isConfirmTabActive() {
      return this.activeTab === TAB.CONFIRM;
    },
    isDeathTabActive() {
      return this.activeTab === TAB.DEATH;
    },
    isRecoverTabActive() {
      return this.activeTab === TAB.RECOVER;
    },
    isNoneConfirmTabActive() {
      return this.activeTab === TAB.NONECONFIRM;
    },
    isHeavyConfirmTabActive() {
      return this.activeTab === TAB.HEAVYCONFIRM;
    },
    isPCRTestTabActive() {
      return this.activeTab === TAB.PCRTEST;
    },
  },
  methods: {
    onConfirmTabClick() {
      this.activeTab = TAB.CONFIRM;
    },
    onDeathTabClick() {
      this.activeTab = TAB.DEATH;
    },
    onRecoverTabClick() {
      this.activeTab = TAB.RECOVER;
    },
    onNoneConfirmTabClick() {
      this.activeTab = TAB.NONECONFIRM;
    },
    onHeavyConfirmTabClick() {
      this.activeTab = TAB.HEAVYCONFIRM;
    },
    onPCRTestTabClick() {
      this.activeTab = TAB.PCRTEST;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-infect-number {
  display: flex;
  flex-direction: column;
  height: auto;
  position: relative;
  .additional-topinfo{
    top: -24px;
  }
}

.infect-info-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:auto;
  padding: 16px 0;
  ul{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0px;
    padding: 0px;
    li{
      width: 40%;
      margin: 0px;
    }
  }
}

.infect-info-graph{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: auto;
}
</style>
