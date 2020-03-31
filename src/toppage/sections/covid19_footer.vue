<template>
  <footer id="covid19-footer">
    <AboutServiceBlock />
    <AboutTeamTermsOfServiceBlock />
  </footer>
</template>

<script>
import AboutServiceBlock from '@/components/AboutServiceBlock';
import AboutTeamTermsOfServiceBlock from '@/components/AboutTeamTermsOfServiceBlock';

export default {
  name: 'Footer',
  components: { AboutServiceBlock, AboutTeamTermsOfServiceBlock },
  data() {
    return {
      msg: '这里是Footer的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-footer {
  display: block;
  width: 100vw;
}
</style>
