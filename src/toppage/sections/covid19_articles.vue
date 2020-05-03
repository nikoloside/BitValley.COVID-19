<template>
  <div id="covid19-article">
    <div
    class="article-box"
    v-for="(article) in articleArray"
    v-bind:key="article.uid">
      <ArticleItemBlock
        v-bind:article-id= "article.uid"
        v-bind:titleja= "article.titleja"
        v-bind:titlecn= "article.titlecn"
        v-bind:descriptionja= "article.descriptionja"
        v-bind:descriptioncn= "article.descriptioncn"
        v-bind:picture= "article.thumbnail"
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
  data() {
    return {
    };
  },
  computed: {
    articleArray() {
      if (articles.articles.length > 1 && articles.articles[0].uid === '1') {
        articles.articles.reverse();
      }
      if (this.$i18n.locale === 'ja') {
        return [];
      }
      return articles.articles;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-article {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 32px 0;
  margin: 0 8px;
  .article-box {
    margin: 24px 12px;
    width: 290px;
  }
  @media (max-width: $breakpoint-pc) {
    .article-box {
      margin: 24px 8px;
      width: 290px;
    }
  }
  @media (max-width: $breakpoint-sp) {
    padding: 0 0;
    .article-box {
      margin: 16px auto;
      width: 290px;
    }
  }
}
</style>
