<template>
  <div id="covid19-check-map">
    <CheckMap />
  </div>
</template>

<script>
import CheckMap from '@/components/CheckMap';

export default {
  name: 'InfectRegion',
  components: { CheckMap },
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

#covid19-check-map {
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
