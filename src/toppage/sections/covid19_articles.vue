<template>
  <div id="covid19-article">
    <div
    class="article-box"
    v-for="(article) in articleDatas"
    v-bind:key="article.uid">
      <ArticleItemBlock
        v-bind:article-id= "article.uid"
        v-bind:titleja= "article.titleja"
        v-bind:titlecn= "article.titlecn"
        v-bind:descriptionja= "article.descriptionja"
        v-bind:descriptioncn= "article.descriptioncn"
        v-bind:picture= "article.imagetop"
      />
    </div>
  </div>
</template>

<script>
import ArticleItemBlock from '@/components/ArticleItemBlock';
import articles from '@/assets/news/articles.json';

export default {
  name: 'Articles',
  components: { ArticleItemBlock },
  created() {
    if (articles.news.length > 1 && articles.news[0].uid === '1') {
      articles.news.reverse();
    }
  },
  data() {
    return {
      articleDatas: articles.articles,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-article {
  display: flex;
  flex-wrap: wrap;
  padding: 32px 0;
  margin: 0 auto;
  .article-box {
    margin: 24px auto;
    width: 23%;
  }
  @media (max-width: $breakpoint-pc) {
    .article-box {
      margin: 16px auto;
      width: 48%;
    }
  }
  @media (max-width: $breakpoint-sp) {
    padding: 0 0;
    .article-box {
      margin: 16px auto;
      width: 94%;
    }
  }
}
</style>
