<template>
  <div id="covid19-comparison">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Comparison',
  data() {
    return {
      msg: '这里是比较的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-comparison {
  display: flex;
}
</style>
