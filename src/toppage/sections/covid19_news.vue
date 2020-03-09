<template>
  <div id="covid19-news">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      msg: '这里是News的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-news {
  display: flex;
}
</style>
