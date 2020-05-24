<template>
  <div>
    <div class="markdown" v-html="compiledMarkdownText" />
    <div class="markdown-foot">
        <div class="markdown-share">
            <ShareFivePanel
            v-bind:share-url="this.articlesArrayja[this.$route.params.id - 1].link"
            v-bind:share-text="this.articlesArrayja[this.$route.params.id - 1].titlecn"
            v-bind:share-text-cn="this.articlesArrayja[this.$route.params.id - 1].descriptioncn"
            v-bind:share-pic-cn="this.articlesArrayja[this.$route.params.id - 1].thumbnail"
            />
        </div>
        <router-link to="/news" v-scroll-to="'#covid19-article'" class="markdown-back">
            {{ $t("messages.newsreturn") }}
        </router-link>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import news from '@/assets/news/news.json';
import articles from '@/assets/news/articles.json';
import ShareFivePanel from '@/components/ShareFivePanel';

export default {
  name: 'Markdown',
  components: { ShareFivePanel },
  data() {
    return {
      articlesArrayja: articles.articles,
      newsArrayja: news.news,
    };
  },
  computed: {
    compiledMarkdownText() {
      if (news.news[0].uid !== '1') {
        news.news.reverse();
      }
      if (articles.articles[0].uid !== '1') {
        articles.articles.reverse();
      }
      if (this.$route.name === 'article') {
        const markdownTextja = this.articlesArrayja[this.$route.params.id - 1].mdja;
        const markdownTextcn = this.articlesArrayja[this.$route.params.id - 1].mdcn;
        return marked(this.$i18n.locale === 'ja' ? markdownTextja.replace('\n', '') : markdownTextcn.replace('\n', ''));
      }
      const markdownTextja = this.newsArrayja[this.$route.params.id - 1].mdja;
      const markdownTextcn = this.newsArrayja[this.$route.params.id - 1].mdcn;
      return marked(this.$i18n.locale === 'ja' ? markdownTextja.replace('\n', '') : markdownTextcn.replace('\n', ''));
    },
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t('messages.metatitle'),
        separator: '|',
        complement: this.articlesArrayja[this.$route.params.id - 1].titlecn,
      };
    },
    meta() {
      return [
        { name: 'description', content: this.articlesArrayja[this.$route.params.id - 1].titlecn },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: this.articlesArrayja[this.$route.params.id - 1].titlecn },
        // eslint-disable-next-line prefer-template
        { property: 'og:url', content: 'https://survival-jp.com/article/' + this.$route.params.id },
        { property: 'og:image', content: this.articlesArrayja[this.$route.params.id - 1].thumbnail },
        { property: 'og:description', content: this.articlesArrayja[this.$route.params.id - 1].descriptioncn },
        { property: 'twitter:card', content: 'summary_large_image' },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/commons/_variables.scss";

.markdown-foot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:auto;
    max-width: 100vw;
    max-width: 612px;
    .markdown-share {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin: 32px 16px;
    }
    .markdown-back {
        width: 79px;
        height: 42px;
        margin: 32px 0;

        display: flex;
        justify-content: center;
        align-items: center;
        @include noto-font-001em(14px, bold);
        line-height: 200%;
        color: $color-gray;

        border: 2px solid $color-gray;
        box-sizing: border-box;
        border-radius: 22px;
        transition: color 0.3 ease;
        transition: all 0.3 ease;
        &:hover {
            color: $color-lightgray;
            border: 2px solid $color-lightgray;
        }
    }
}

.markdown {
    padding:1em;
    margin:auto;
    max-width: 100vw;
    max-width: 612px;
    background: $color-white;
    counter-reset: chapter;
    font-size: 16px;
    line-height: 200%;
    letter-spacing: 0.01em;
    color: #21262D;

    & >>> img {
        width: 100%;
        height: auto;
        max-width: 1280px;
    }

    & >>> h1 {
        color: #000000;
        @include noto-font(32px, bold);
        text-align: left;
    }

    & >>> h2 {
        color: #000000;
        @include noto-font(24px, bold);
        text-align: left;
    }

    & >>> h5 {
        @include poppins-font(14px, normal);
        color: $color-gray;
        text-align: left;
    }

    & >>> h6 {
        color: #828E9F;
        @include noto-font-001em(16px, normal);
        text-align: center;
        margin-top: 0px; // 8px;
        margin-bottom: 24px;
        margin-left: 0px;
        margin-right: 0px;
    }

    & >>> p {
        @include noto-font-001em(16px, normal);
        color: #21262D;
        line-height: 200%;
        margin: 24px 0;
        padding: 0;
    }

    & >>> h1, h2, h5, p, blockquote, ul, ol, dl, li, table, pre {
      margin: 24px 0;
    }

    & >>> a, a:visited {
        word-wrap:break-word;
        color: #0452E6;
        background-color: inherit;
        text-decoration: none;
        font-weight: bold;
        transition: opacity .3s ease;
        opacity: 1.0;
    }

    & >>> a:hover {
        opacity: 0.5;
    }

    & >>> blockquote {
        @include noto-font-001em(14px, normal);
        color: $color-darkgray;
        line-height: 200%;
        padding: 24px;
        margin: 0;
        background: $color-palegray;
        border-radius: 4px;

        p {
          margin: 0;
        }
    }

    & >>> ol {
        padding-left: 24px;
        li {
            @include noto-font-001em(16px, normal);
            color: #21262D;
            line-height: 200%;
        }

    }

    & >>> ul {
        padding-left: 24px;
        li {
            @include noto-font-001em(16px, normal);
            color: #21262D;
            line-height: 200%;
        }
        li:before {
            content: "•";
            color: #21262D;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
        }
    }
}


</style>
