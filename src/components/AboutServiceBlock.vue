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
      日本と中国のウイルス症状や予防対策に対する認識は異なります。
      当サイトは日本と中国の新型コロナウイルスに関する情報を収集し、まとめて伝えることで、日本で住む方が日中のウイルスの対策を把握できるようにすることを目的としています。
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
    margin: 20px 0 0;
    font-size: 16px;
    font-weight: bold;
    color: $color-darkgray;

    @media (max-width: $break-point) {
      font-size: 14px;
    }
  }

  .share-title {
    margin: 32px 0 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;;
  }
}
</style>
