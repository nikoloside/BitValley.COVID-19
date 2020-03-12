<template>
  <div id="covid19-infect-number">
    <div class="infect-number-left">
      <DashBoardMedium></DashBoardMedium>
      <DashBoardMedium></DashBoardMedium>
    </div>
  </div>
</template>

<script>
import DashBoardMedium from '@/components/DashBoardMedium';
import DashBoardLarge from '@/components/DashBoardLarge';

export default {
  name: 'InfectNumber',
  components: {
    DashBoardMedium,
    DashBoardLarge,
  },
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

#covid19-infect-number {
  display: flex;
}
</style>
