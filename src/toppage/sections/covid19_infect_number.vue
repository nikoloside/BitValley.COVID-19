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
          v-bind:total-persons= "symptomless"
          v-bind:diff-persons= "newSymptomless"
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
      <LineGraph
        v-bind:line-data="graphList"
        v-bind:messages-name="messagesName"
      />
    </div>
    <p class="additional-info">
      <UpdateAtLabel v-bind:update-at="updateAt" />
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import LineGraph from '@/components/LineGraph';
import LineGraphTab from '@/components/LineGraphTabClickable';
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
      symptomless: 0,
      newSymptomless: 0,
      symptomlessList: [],
      confirmedList: [],
      recoveredList: [],
      criticalList: [],
      testedList: [],
      deathList: [],
      graphList: [],
      messagesName: 'messages.datajapanconfirm',
      updateAt: new Date(),
    };
  },
  mounted() {
    axios.get('https://api.survival-jp.com/api/patient/latest')
      .then((response) => {
        const data = response.data.data;
        this.totalConfirmed = data.Confirmed;
        this.newConfirmed = data.NewConfirmed;
        this.totalDeaths = data.Dead;
        this.newDeaths = data.NewDead;
        this.totalRecovered = data.Recovered;
        this.newRecovered = data.NewRecovered;
        this.totalCritical = data.Critical;
        this.newCritical = data.NewCritical;
        this.totalTested = data.Tested;
        this.newTested = data.NewTested;
        this.symptomless = data.Symptomless;
        this.newSymptomless = data.NewSymptomless;
      });


    axios.get('https://api.survival-jp.com/api/patient/period?number=19')
      .then((response) => {
        this.confirmedList = [];
        this.recoveredList = [];
        this.testedList = [];
        this.deathList = [];
        this.criticalList = [];
        this.symptomlessList = [];
        response.data.data.forEach((patientByDate) => {
          const dead = {
            date: patientByDate.Date,
            count: Number(patientByDate.Dead),
          };
          this.deathList.push(dead);
          const recovered = {
            date: patientByDate.Date,
            count: Number(patientByDate.Recovered),
          };
          this.recoveredList.push(recovered);
          const critical = {
            date: patientByDate.Date,
            count: Number(patientByDate.Critical),
          };
          this.criticalList.push(critical);
          const tested = {
            date: patientByDate.Date,
            count: Number(patientByDate.Tested),
          };
          this.testedList.push(tested);
          const confirmed = {
            date: patientByDate.Date,
            count: Number(patientByDate.Confirmed),
          };
          this.confirmedList.push(confirmed);

          const symptomless = {
            date: patientByDate.Date,
            count: Number(patientByDate.Symptomless),
          };
          this.symptomlessList.push(symptomless);
        });
        this.graphList = this.confirmedList;
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
      this.graphList = this.confirmedList;
      this.activeTab = TAB.CONFIRM;
      this.messagesName = 'messages.datajapanconfirm';
    },
    onDeathTabClick() {
      this.graphList = this.deathList;
      this.activeTab = TAB.DEATH;
      this.messagesName = 'messages.datajapandeath';
    },
    onRecoverTabClick() {
      this.graphList = this.recoveredList;
      this.activeTab = TAB.RECOVER;
      this.messagesName = 'messages.datajapanrecover';
    },
    onNoneConfirmTabClick() {
      this.graphList = this.symptomlessList;
      this.activeTab = TAB.NONECONFIRM;
      this.messagesName = 'messages.datanoneconfirm';
    },
    onHeavyConfirmTabClick() {
      this.graphList = this.criticalList;
      this.activeTab = TAB.HEAVYCONFIRM;
      this.messagesName = 'messages.dataheavyconfirm';
    },
    onPCRTestTabClick() {
      this.graphList = this.testedList;
      this.activeTab = TAB.PCRTEST;
      this.messagesName = 'messages.datapcrtest';
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
