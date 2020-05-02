<template>
  <div>
    <div class="markdown" v-html="compiledMarkdownText" />
    <div class="markdown-foot">
        <div class="markdown-share">
            <ShareFivePanel/>
        </div>
        <div class="markdown-back">
            {{ $t("messages.datareturn") }}
        </div>
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
      markdownTextja: this.$route.path === '/article' ? articles.articles[this.$route.params.id].mdja : news.news[this.$route.params.id].mdja,
      markdownTextcn: this.$route.path === '/article' ? articles.articles[this.$route.params.id].mdcn : news.news[this.$route.params.id].mdcn,
    };
  },
  computed: {
    compiledMarkdownText() {
      return marked(this.$i18n.locale === 'ja' ? this.markdownTextja.replace('\n', '') : this.markdownTextcn.replace('\n', ''));
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
        position: relative;
        right: 0;
        text-align: right;
        width: 100%;
    }
    .markdown-back {
        width: 79px;
        height: 42px;
        margin: 48px 0;

        display: flex;
        justify-content: center;
        align-items: center;
        @include noto-font-001em(24px, bold);
        line-height: 200%;
        color: $color-gray;

        border: 2px solid $color-gray;
        box-sizing: border-box;
        border-radius: 22px;
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
        max-height: 670px;
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
        margin: 0;
        padding: 0;
    }

    & >>> h1, h2, h3, p, blockquote, ul, ol, dl, li, table, pre {
        margin-top: 32px;
        margin-bottom: 24px;
        margin-left: 0px;
        margin-right: 0px;
    }

    & >>> a, a:hover, a:visited {
        color: #0452E6;
        background-color: inherit;
        text-decoration: none;
        font-weight: bold;
    }

    & >>> blockquote {
        @include noto-font-001em(14px, normal);
        color: $color-darkgray;
        line-height: 200%;
        padding: 24px;
        margin: 0;
        background: $color-palegray;
        border-radius: 4px;
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
