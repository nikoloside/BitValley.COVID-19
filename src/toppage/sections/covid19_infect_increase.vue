<template>
  <div id="covid19-infect-increase">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'InfectIncrease',
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

#covid19-infect-increase {
  display: flex;
}
</style>
