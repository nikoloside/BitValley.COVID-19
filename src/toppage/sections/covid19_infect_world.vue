<template>
  <div id="covid19-infect-world">
    <p class="additional-topinfo">
      <UpdateTimeLabel v-bind:update-time="updateAt" />
    </p>

    <ul>
      <li>
      <LineGraphTab
        id="world-confirm-link"
        label="感染者数"
        :is-active="false"
        bg-class="none"
        v-bind:total-persons="totalPersons"
        v-bind:diff-persons="totalDiffs"
      />
      </li>
      <li>
      <LineGraphTab
        id="world-death-link"
        label="死亡者数"
        :is-active="false"
        bg-class="none"
        v-bind:total-persons="totalDeathPersons"
        v-bind:diff-persons="totalDeathDiffs"
      />
      </li>
      <li>
      <LineGraphTab
        id="world-recover-link"
        label="回復者数"
        :is-active="false"
        bg-class="none"
        v-bind:total-persons="totalRecoverPersons"
        v-bind:diff-persons="totalRecoverDiffs"
      />
      </li>
    </ul>
    <WorldRegionMap />
    <WorldRegionTableBlock />

    <p class="additional-info">
      <UpdateAtLabel v-bind:update-at="updateAt" />
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import WorldRegionTableBlock from '@/components/WorldRegionTableBlock';
import LineGraphTab from '@/components/LineGraphTab';
import WorldRegionMap from '@/components/WorldRegionMap';
import UpdateAtLabel from '@/components/UpdateAtLabel';
import UpdateTimeLabel from '@/components/UpdateTimeLabel';

export default {
  name: 'InfectRegion',
  data() {
    return {
      // TODO 更新時間を埋める
      totalPersons: 10000,
      totalDiffs: 100,
      totalRecoverPersons: 200,
      totalRecoverDiffs: 300,
      totalDeathPersons: 400,
      totalDeathDiffs: 500,
      updateAt: new Date(),
    };
  },
  mounted() {
    axios.get('http://covid-info.site:8080/api/patient/global/current')
      .then((response) => {
        this.totalPersons = response.data.data.Confirmed;
        this.totalDeathPersons = response.data.data.Deaths;
        this.totalRecoverPersons = response.data.data.Recovered;
      });

    axios.get('http://covid-info.site:8080/api/patient/global/growth')
      .then((response) => {
        this.totalDiffs = response.data.data.NewConfirmed;
        this.totalDeathDiffs = response.data.data.NewDeaths;
        this.totalRecoverDiffs = response.data.data.NewRecovered;
      });

    axios.get('http://covid-info.site:8080/api/patient/updateTime')
      .then((response) => {
        this.updateAt = response.data.data.PatientDataUpdateTime;
      }).catch(() => {
        // 暫定的な対応
        this.updateAt = new Date(Date.now() - 864e5);
      });
  },
  components: {
    LineGraphTab,
    WorldRegionMap,
    WorldRegionTableBlock,
    UpdateAtLabel,
    UpdateTimeLabel,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-infect-world {
  position: relative;
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
</style>
