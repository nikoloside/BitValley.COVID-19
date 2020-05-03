<template>
  <article id="AboutService">
    <h3 class="about-service-header">
      <img
        class="service-logo"
        alt="「さよならコロナ」新型コロナウイルス事例チェックマップ"
        :src="$i18n.locale === 'ja' ?
        require('../assets/image/logo.png') : require('../assets/image/logocn@2x.png')"
        :srcset="$i18n.locale === 'ja' ?
        require('../assets/image/logo.png') : require('../assets/image/logocn@4x.png')"
      />

      <div class="footer-desktop-wrapper">
        <div class="share-panel-desktop-wrapper">
          <ShareFivePanel />
        </div>
        <div class="question-button-desktop-wrapper">
          <QuestionButton />
        </div>
      </div>
    </h3>

    <p class="service-description">
      {{$t("messages.aboutSite1")}}
      <br />
      {{$t("messages.aboutSite2")}}
      <br />
      {{$t("messages.aboutSite3")}}
      <br />
    </p>

    <div class="share-panel-mobile-wrapper">
      <h4 class="share-title">{{ $t("messages.headershare") }}</h4>
      <ShareFivePanel />
    </div>
  </article>
</template>

<script>
import SharePanel from '@/components/SharePanel';
import ShareFivePanel from '@/components/ShareFivePanel';
import QuestionButton from '@/components/QuestionButton';

export default {
  name: 'AboutServiceBlock',
  components: { SharePanel, ShareFivePanel, QuestionButton },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";
$break-point: 480px;

#AboutService {
  text-align: left;
  padding: 40px 16px;
  background-color: $color-palegray;

  .share-panel-mobile-wrapper {
    display: none;
  }

  .footer-desktop-wrapper {
    display: flex;
  }

  .share-panel-desktop-wrapper {
    margin-right: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: $breakpoint-sp) {
    padding: 30px 16px;

    .footer-desktop-wrapper {
      display: none;
    }
  }

  @media (max-width: $breakpoint-pc) {
    .share-panel-desktop-wrapper {
      display: none;
    }
    .share-panel-mobile-wrapper {
      display: block;
    }
  }

  .about-service-header {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .service-logo {
    width: auto;
    height: 50px;

    @media (max-width: $break-point) {
      width: auto;
      height: 38px;
    }
  }

  .service-description {
    @include noto-font-001em(16px, normal);
    margin: 20px 0 0;
    color: $color-darkgray;

    @media (max-width: $break-point) {
      @include noto-font-001em(14px, normal);
    }
  }

  .share-title {
    @include noto-font-001em(16px, bold);
    margin: 32px 0 20px;
    text-align: center;
  }
}
</style>
