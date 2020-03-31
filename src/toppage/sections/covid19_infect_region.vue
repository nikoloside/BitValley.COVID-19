<template>
  <div id="covid19-infect-region">
    <div class="desktop-graph-wrapper">
      <InfectRegionGraphDesktop />
    </div>
    <div class="mobile-graph-wrapper">
      <InfectRegionGraphMobile />
    </div>
  </div>
</template>

<script>
import InfectRegionGraphDesktop from '@/components/InfectRegionGraphDesktop';
import InfectRegionGraphMobile from '@/components/InfectRegionGraphMobile';

export default {
  name: 'InfectRegion',
  components: { InfectRegionGraphDesktop, InfectRegionGraphMobile },
  data() {
    return {
      msg: '这里是日本各地的感染情报的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-infect-region {
  .mobile-graph-wrapper {
    display: none;
  }

  @media (max-width: 480px) {
    .mobile-graph-wrapper {
      display: block;
    }

    .desktop-graph-wrapper {
      display: none;
    }
  }
}
</style>
