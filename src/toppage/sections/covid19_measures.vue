<template>
  <div id="covid19-measures">
    <PreventMeasureBlock />
  </div>
</template>

<script>
import PreventMeasureBlock from '@/components/PreventMeasureBlock';

export default {
  name: 'Measures',
  components: { PreventMeasureBlock },
  data() {
    return {
      msg: '这里是防疫情报，预防情报的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-measures {
  display: block;
}
</style>
