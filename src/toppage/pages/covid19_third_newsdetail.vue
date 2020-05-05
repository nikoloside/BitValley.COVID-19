<template>
  <div class="page-container">

    <MarkdownNews></MarkdownNews>

  </div>
</template>

<script>
import MarkdownNews from '@/components/MarkdownNews';

export default {
  name: 'SecondNewsPage',
  components: {
    MarkdownNews,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/commons/_variables.scss";

// ver1.2仕様 必须通过列表进行切换
</style>
