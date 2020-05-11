<template>
    <router-link
    :to="{name: 'article', params: {id: articleId}}"
    id="ArticleItemBlock"
    >
        <div class="article-graph">
            <img :src="picture">
        </div>
        <div class="article-title">
            {{ articleTitle }}
        </div>
        <div class="article-description">
            {{ articleDescription }}
        </div>
    </router-link>
</template>

<script>

export default {
  name: 'ArticleItemBlock',
  props: {
    articleId: String,
    titleja: String,
    titlecn: String,
    descriptionja: String,
    descriptioncn: String,
    picture: String,
  },
  computed: {
    articleTitle() {
      return this.$i18n.locale === 'ja' ? this.titleja : this.titlecn;
    },
    articleDescription() {
      return this.$i18n.locale === 'ja' ? this.descriptionja : this.descriptioncn;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

#ArticleItemBlock {
    background: #FFFFFF;
    box-shadow: 0px 6px 36px #E8ECF2;
    border-radius: 12px;
    width: 100%;
    height: 295px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;

    .article-graph {
        width: 100%;
        height: 153px;
        overflow: hidden;
        border-radius: 12px 12px 0px 0px;
        img {
            width: auto;
            height: 100%;
        }
        transition: opacity .3s ease;
        @media (max-width: $breakpoint-pc) {
            img {
                width: 100%;
                height: auto;
            }
        }
    }

    &:hover .article-graph {
        opacity: 0.5;
    }
    .article-title {
        @include noto-font-001em(16px, bold);
        color: $color-black;
        margin-bottom: 8px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 8px 16px;
        transition: color .3s ease;
        height: 48px;
    }
    &:hover .article-title {
        color: $color-blue;
    }
    .article-description {
        @include noto-font-001em(12px, normal);
        color: $color-gray;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin: 0 16px;
    }

}


</style>
