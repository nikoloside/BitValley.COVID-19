<template>
  <div>

    <div id="section-news" class="section section-news">
      <div class="section-left" />{{ $t("messages.titlenews") }}
    </div>
    <News></News>

  </div>
</template>

<script>
import News from '@/toppage/sections/covid19_news';

export default {
  name: 'TopPage',
  components: {
    News,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/commons/_variables.scss";

// ver1.2仕様 必须通过列表进行切换
</style>
