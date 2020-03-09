<template>
  <div id="covid19-footer">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      msg: '这里是Footer的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-footer {
  display: flex;
}
</style>
