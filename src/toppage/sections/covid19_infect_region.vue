<template>
  <div id="covid19-infect-region">
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
import UpdateAtLabel from '@/components/UpdateAtLabel';

export default {
  name: 'InfectRegion',
  components: { InfectRegionTableBlock, UpdateAtLabel },
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
$break-point: 480px;

#covid19-infect-region {
  .additional-info {
    @include noto-font-001em(14px, normal);
    padding: 0;
    margin: 8px 0;
    color: $color-lightgray;

    &:last-child {
      margin-bottom: 0;
    }

    @media (max-width: $break-point) {
      @include noto-font-001em(10px, normal);
      margin: 4px 0;
    }
  }
}
</style>
