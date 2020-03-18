<template>
  <footer id="covid19-header">
    <HeaderPcBlock />
    <HeaderSpBlock />
  </footer>
</template>

<script>
import HeaderPcBlock from '@/components/HeaderPcBlock';
import HeaderSpBlock from '@/components/HeaderSpBlock';

export default {
  name: 'Header',
  components: { HeaderPcBlock, HeaderSpBlock },
  data() {
    return {
      msg: '这里是Header的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-header {
  display: block;
  width: 100vw;
}
</style>
