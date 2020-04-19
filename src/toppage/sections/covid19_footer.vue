<template>
  <footer id="covid19-footer">
    <AboutServiceBlock />
    <AboutTeamTermsOfServiceBlock />
    <div class="logo-koi">
       <img :srcset="`${photos.photo_sp} 480w,${photos.photo_pc} 1280w`"
        alt="Photo 1"
        src="../../assets/image/koi.png">
        <div class="logo-koi-title">
          SATOJASO
        </div>
    </div>
  </footer>
</template>

<script>
import AboutServiceBlock from '@/components/AboutServiceBlock';
import AboutTeamTermsOfServiceBlock from '@/components/AboutTeamTermsOfServiceBlock';

const photos = {
  // eslint-disable-next-line global-require
  photo_sp: require('../../assets/image/koi.png'),
  // eslint-disable-next-line global-require
  photo_pc: require('../../assets/image/koi@2x.png'),
};

export default {
  name: 'Footer',
  components: { AboutServiceBlock, AboutTeamTermsOfServiceBlock },
  data() {
    return {
      photos,
    };
  },
  compute: {
    photos() {
      return photos;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-footer {
  display: block;
  width: 100vw;
  background-color: $color-blightgray;

  .logo-koi {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 12px;
    padding-bottom: 40px;
    img {
      margin-bottom: 4px;
      width: 68px;
      height: auto;
    }
    .logo-koi-title {
      @include poppins-font-001em(12px, bold);
      color: $color-lightgray;
    }
  }
}
</style>
