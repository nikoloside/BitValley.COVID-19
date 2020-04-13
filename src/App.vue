<template>
  <div id="app flex-container-spacebetween">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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

// 这里开始是地图的css
.marker {
  text-align: center;
  color: white;
  font-size: 16;
  border-radius: 8px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}
.info {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: white;
  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  border-radius: 5px;

  h4 {
    margin: 0 0 5px;
    color: #777;
  }
}
.legend {
  line-height: 20px;
  color: $color-gray;
  text-align: left;
  @include poppins-font-001em(12px, bold);
  i {
    width: 16px;
    height: 16px;
    float: left;
    margin-right: 8px;
    border-radius: 4px;
  }
}
</style>
