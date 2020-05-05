<template>
  <div class="page-container">
    <div id="section-checkmap" class="section-wrapper wrap-shadow section-checkmap">
      <div class="section">
        <div class="section-left" />{{ $t("messages.titlecheckmap") }}
      </div>
      <CheckMap/>
    </div>
  </div>
</template>

<script>
import CheckMap from '@/toppage/sections/covid19_check_map';

export default {
  name: 'SecondMapPage',
  components: {
    CheckMap,
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t('messages.metatitle'),
        separator: '|',
        complement: 'Top',
      };
    },
    meta() {
      return [
        { name: 'description', content: this.$i18n.t('messages.metadescription') },
        { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
        { charset: 'utf-8' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '「さよならコロナ」感染情報チェックマップ' },
        { property: 'og:url', content: 'https://survival-jp.com' },
        { property: 'og:image', content: 'https://res.cloudinary.com/df6wesepg/image/upload/v1588696192/promotion/OGP_jp_mehcze.png' },
        { property: 'og:description', content: '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/commons/_variables.scss";

// ver1.2仕様 必须通过列表进行切换
.section-checkmap {
  .section {
    margin-left: 0;
  }
}
</style>
