<template>
  <article id="AboutService">
    <h3 class="about-service-header">
      <img
        class="service-logo"
        alt="新型コロナウイルス対策"
        src="../assets/image/logo.svg"
      />

      <div class="share-panel-desktop-wrapper">
        <SharePanel />
      </div>
    </h3>

    <p class="service-description">
      日本と中国のウイルス症状や予防対策に対する認識は相違がございます。
      当サイトは中国で応用されてる新型コロナ対策とともに、日本での最新情報や対策をまとめてお伝えさせていただきたく存じます。
      日本で住む方々が日中のウイルス対策について把握できるようにすることを目的としています。
    </p>

    <div class="share-panel-mobile-wrapper">
      <h4 class="share-title">シェア</h4>
      <SharePanel />
    </div>
  </article>
</template>

<script>
import SharePanel from '@/components/SharePanel';

export default {
  name: 'AboutServiceBlock',
  components: { SharePanel },
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

  @media (max-width: $break-point) {
    padding: 30px 16px;

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
    height: 50px;

    @media (max-width: $break-point) {
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
