<template>
  <div id="covid19-news">
    <NewsListBlock />
  </div>
</template>

<script>
import NewsListBlock from '@/components/NewsListBlock';

export default {
  name: 'News',
  components: { NewsListBlock },
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
  display: block;
}
</style>
