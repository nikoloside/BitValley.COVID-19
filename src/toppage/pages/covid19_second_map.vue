<template>
  <div>
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
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
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
