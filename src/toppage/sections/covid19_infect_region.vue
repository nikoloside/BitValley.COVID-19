<template>
  <div id="covid19-infect-region">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'InfectRegion',
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
  display: flex;
}
</style>
