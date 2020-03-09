<template>
  <div id="covid19-pickup">
    <div class="wrap-pickup wrap-shadow flex-container-start">
      <div class="icon-pickup flex-container-start">
        <div class="icon-pickup-dot"></div>
        <div class="icon-pickup-title">PICKUP</div>
      </div>
      <div class="icon-pickup-text">
        <a href="https://www.huffingtonpost.jp/entry/sengen_jp_5e6081f2c5b69d641c0a99c9">緊急事態宣言でどう変わる？ 新型コロナウイルス対策での発令を政府が検討
          </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PickUp',
  data() {
    return {
      msg: '这里是PickUp',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-pickup {
  display: flex;
  margin-top: 112px;
}

.wrap-pickup {
  width: 100%;
  height: 66px;
}

.icon-pickup {
  margin: 0 24px;

  .icon-pickup-dot {
    width: 14px;
    height: 14px;
    background: $gradation-mix;
    box-shadow: $box-shadow-button;
    border-radius: 14px;
    transform: rotate(90deg);
    margin-right: 8px;
    z-index: $z-index-wrap;
  }
  .icon-pickup-title {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */
    letter-spacing: 0.01em;
    color: $color-pink
  }
}
.icon-pickup-text {
  font-family: Noto Sans CJK JP;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */
  letter-spacing: 0.01em;
  a {
    text-decoration: none;
  }
}
</style>
