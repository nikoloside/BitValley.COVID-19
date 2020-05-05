<template>
  <div class="page-container">
    <div class="section-dashboard">
    <div class="section-japan">
      <div id="section-infect" class="section-wrapper wrap-shadow section-infect">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titlejapan") }}
        </div>
        <InfectNumber></InfectNumber>
      </div>

      <div id="section-region" class="section-wrapper wrap-shadow section-region">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titleregion") }}
        </div>
        <InfectRegion />
      </div>
    </div>

    <div id="section-world" class="section-wrapper wrap-shadow section-world">
      <div class="section">
        <div class="section-left" />{{ $t("messages.titleworld") }}
      </div>
      <InfectWorld/>
    </div>
    </div>

  </div>
</template>

<script>
import InfectNumber from '@/toppage/sections/covid19_infect_number';
import InfectRegion from '@/toppage/sections/covid19_infect_region';
import InfectWorld from '@/toppage/sections/covid19_infect_world';

export default {
  name: 'SecondInfectPage',
  components: {
    InfectNumber,
    InfectRegion,
    InfectWorld,
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
.section-dashboard {
  display: flex;
  @media (max-width: $breakpoint-pc) {
    flex-direction: column;
  }
}
.section-japan {
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: $breakpoint-pc) {
    width:100%;
  }
}
.section-infect {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-region {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-world {
  .section {
    margin-left: 0px;
  }
  width: 50%;
  margin-left:0px;
  margin-right:24px;
  margin-top: 12px;
  margin-bottom: 12px;
  @media (max-width: $breakpoint-pc) {
    width: auto;
    margin: 12px 16px;
  }
}

.additional-topinfo {
  @include noto-font-001em(14px, bold);
  padding: 0;
  margin: 8px 0;
  color: $color-gray;
  position: absolute;
  top: -48px;
  right: 0px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}

.additional-info {
  @include noto-font-001em(14px, normal);
  padding: 0;
  margin: 8px 0;
  color: $color-lightgray;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}
</style>
