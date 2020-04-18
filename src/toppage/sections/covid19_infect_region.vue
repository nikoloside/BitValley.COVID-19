<template>
  <div id="covid19-infect-region">
    <p class="additional-topinfo">
      <UpdateTimeLabel v-bind:update-time="updateAt" />
    </p>
    <InfectRegionTableBlock />

    <p class="additional-info">
      感染率：各地域における総人口数のうち、感染した人数の割合
    </p>
    <p class="additional-info">
      <UpdateAtLabel v-bind:update-at="updateAt" />
    </p>
  </div>
</template>

<script>
import InfectRegionTableBlock from '@/components/InfectRegionTableBlock';
import axios from 'axios';
import UpdateAtLabel from '@/components/UpdateAtLabel';
import UpdateTimeLabel from '@/components/UpdateTimeLabel';

export default {
  name: 'InfectRegion',
  components: { InfectRegionTableBlock, UpdateAtLabel, UpdateTimeLabel },
  data() {
    return {
      // TODO 更新時間を埋める
      updateAt: new Date(),
    };
  },
  mounted() {
    axios.get('https://api.survival-jp.com/api/patient/updateTime')
      .then((response) => {
        this.updateAt = new Date(response.data.data.PatientDataUpdateTime);
      }).catch(() => {
        // 暫定的な対応
        this.updateAt = new Date('-');
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";
$break-point: 480px;

#covid19-infect-region {
  position: relative;
}
</style>
