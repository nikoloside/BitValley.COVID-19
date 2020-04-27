<template>
  <div class="markdown">
    <div v-html="compiledMarkdownText" />
  </div>
</template>

<script>
import marked from 'marked';
import md from '@/assets/news/sample.md';

export default {
  name: 'Markdown',
  data() {
    return {
      markdownText: md.source,
    };
  },
  computed: {
    compiledMarkdownText() {
      return marked(this.markdownText);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/commons/_variables.scss";

.markdown {
    padding:1em;
    margin:auto;
    max-width: 60em;
    width: 612px;
    background: $color-white;
    counter-reset: chapter;
    font-size: 16px;
    line-height: 200%;
    letter-spacing: 0.01em;
    color: #21262D;

}

img {
    width: 100%;
}

h1 {
    color: #000000;
    font-size: 32px;
    clear: center;
    line-height: 47px;
    font-weight: bold;
    font-style: normal;
    text-align: center;
}


h2 {
    color: #000000;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    counter-increment: chapter;
    counter-reset: section;
    clear: center;
}

h6 {
    color: #828E9F;
    background-color: inherit;
    font-size: 16px;
    line-height: 150%;
    font-weight: normal;
    text-align: center;
}

h1, h2, h3, h6, p, blockquote, ul, ol, dl, li, table, pre {
    margin-top: 32px;
    margin-bottom: 24px;
    margin-left: 0px;
    margin-right: 0px;
}
a, a:hover, a:visited {
    color: #0452E6;
    background-color: inherit;
    text-decoration: none;
}

</style>
