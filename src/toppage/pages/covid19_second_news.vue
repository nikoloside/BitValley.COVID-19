<template>
  <div class="page-container">
    <Articles></Articles>
    <div id="section-news" class="section section-news">
      <div class="section-left" />{{ $t("messages.titlenews") }}
    </div>
    <News></News>

  </div>
</template>

<script>
import News from '@/toppage/sections/covid19_news';
import Articles from '@/toppage/sections/covid19_articles';

export default {
  name: 'SecondNewsPage',
  components: {
    News,
    Articles,
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
</style>
