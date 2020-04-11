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
        v-bind:total-persons= "5912"
        v-bind:diff-persons= "615"
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
        v-bind:total-persons= "99"
        v-bind:diff-persons= "0"
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
        v-bind:total-persons= "99"
        v-bind:diff-persons= "0"
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
import WorldRegionTableBlock from '@/components/WorldRegionTableBlock';
import LineGraphTab from '@/components/LineGraphTab';
import WorldRegionMap from '@/components/WorldRegionMap';
import UpdateAtLabel from '@/components/UpdateAtLabel';
import UpdateTimeLabel from '@/components/UpdateTimeLabel';

export default {
  name: 'InfectRegion',
  components: {
    LineGraphTab,
    WorldRegionMap,
    WorldRegionTableBlock,
    UpdateAtLabel,
    UpdateTimeLabel,
  },
  data() {
    return {
      // TODO 更新時間を埋める
      updateAt: new Date(),
    };
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
