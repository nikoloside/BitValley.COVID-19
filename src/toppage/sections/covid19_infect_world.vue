<template>
  <div id="covid19-infect-world">
    <p class="additional-topinfo">
      <UpdateTimeLabel v-bind:update-time="updateAt" />
    </p>

    <ul>
      <li>
      <LineGraphTab
        id="world-confirm-link"
        api-id="world-confirm"
        bg-class="none"
        label="感染者数"
        v-bind:is-active="false"
        v-bind:on-click="null"
        v-bind:total-persons="totalPersons"
        v-bind:diff-persons="totalDiffs"
      />
      </li>
      <li>
      <LineGraphTab
        id="world-death-link"
        api-id="world-death"
        bg-class="none"
        label="死亡者数"
        v-bind:is-active="false"
        v-bind:on-click="null"
        v-bind:total-persons="totalDeathPersons"
        v-bind:diff-persons="totalDeathDiffs"
      />
      </li>
      <li>
      <LineGraphTab
        id="world-recover-link"
        api-id="world-recover"
        bg-class="none"
        label="回復者数"
        v-bind:is-active="false"
        v-bind:on-click="null"
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
        this.$forceUpdate();
        this.$set(this.totalPersons, response.data.data.Confirmed, true);
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

.marker {
  text-align: center;
  color: white;
  font-size: 16;
  border-radius: 8px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}
.red {
  background: red;
}
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;

  h4 {
    margin: 0 0 5px;
    color: #777;
  }
}
.legend {
  line-height: 18px;
  color: #555;
  i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
  }
}
</style>
