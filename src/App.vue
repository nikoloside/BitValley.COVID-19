<template>
  <div id="app flex-container-spacebetween">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  head: {
    title: {
      inner: '新型コロナウイルス感染症対策サイト',
    },
    meta: [
      { name: 'description', content: '新型コロナウイルス感染症対策サイト' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,user-scalable=no' },
      { charset: 'utf-8' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '新型コロナウイルス感染症対策サイト' },
      { property: 'og:url', content: 'covid-info.site' },
      { property: 'og:og:image', content: '新型コロナウイルス感染症対策サイト' },
      { property: 'og:og:description', content: '新型コロナウイルス感染症対策サイト' },
      // ...
    ],
  },
};
</script>

<style  lang="scss">
@import "./commons/_variables.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-black;
}

// 以下是所有的页面共通的scss 共通class
// Google Font
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,500,700|Poppins:400,500,700&display=swap&subset=japanese');

// Plate的共通样式
.wrap-shadow {
  box-shadow: $box-shadow-wrap;
  border-radius: 12px;
}

// flex的共通化
.flex-container-start {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.flex-container-spacebetween {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-direction-column {
  flex-direction: column;
}

</style>
