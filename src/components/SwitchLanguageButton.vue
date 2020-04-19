<template>
    <div id="switch_language_button">
        <div class="language-wrap">
            <label class="language-now" for="toggle">
                <div class="language-now-text">
                 {{ $t("messages.language") }}
                </div>
                <div class="language-downer"/>
            </label>
        </div>
        <input type="checkbox" v-model="checkboxModel" id="toggle">
        <div class="language-button" v-on:click.prevent="clickNextLang()">
            <div class="language-button-text">
                 {{ getNextLang() }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SwitchLanguageButton',
  data() {
    return {
      checkboxModel: false,
    };
  },
  methods: {
    getNextLang() {
      switch (this.$i18n.locale) {
        case 'ja':
          return '中文';
        case 'cn':
          return '日本語';
        default:
          return '日本語';
      }
    },
    clickNextLang() {
      this.checkboxModel = false;
      switch (this.$i18n.locale) {
        case 'ja':
          this.$i18n.locale = 'cn';
          break;
        case 'cn':
          this.$i18n.locale = 'ja';
          break;
        default:
          this.$i18n.locale = 'ja';
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#switch_language_button {

    position: relative;
    .language-wrap{
        width: 136px;
        height: 42px;
        border-radius: 21px;

        position: relative;
        background: linear-gradient(107.16deg, #1F72FF 0%, #0452E6 100%);
        box-shadow: $box-shadow-button;
        z-index: $z-index-header;
    }

    .language-now {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: $z-index-over;
        position: absolute;
    }
    .language-now:hover {
        background: #7BAAFF;
        border-radius: 21px;
    }
    .language-now:active {
        background: #004AD7;
        border-radius: 21px;
    }

    .language-button{
      position: absolute;
      top: -20px;
      transition: all .3s ease;
      -webkit-transition: all .3s ease;
      padding-top: 3vh;
      padding: 0;
      margin: 0;
      background-color: $color-white;
      width: 136px;
      height: 72px;
      cursor: pointer;
      box-shadow: 0px 6px 36px #E8ECF2;
      border-radius: 4px;
      z-index: $z-index-button;
      align-items: center;
      justify-content: center;
      color: #828E9F;
      pointer-events: none;
      display: flex;
      opacity: 0;
    }
    .language-button:hover {
      color: $color-black;
    }
    #toggle:checked ~ .language-button{
      top: 20px;
      pointer-events: visible;
      display: flex;
      opacity: 1;
    }
    #toggle:checked ~ .language-now{
      background: #0452E6;
    }

    #toggle {
        display: none;
    }
}

.language-now-text {
    @include noto-font-001em(14px, bold);
    text-align: center;
    color: $color-white;
    margin-right: 30px;
    margin-left: 20px;
}
.language-downer {
    width: 7.2px;
    height: 7.2px;
    border-top: 1.5px solid $color-white;
    border-right: 1.5px solid $color-white;
    border-radius: 1px;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    cursor: pointer;
}
.language-button-text{
    position: absolute;
    bottom: 16px;
    @include noto-font-001em(12px, bold);
}
</style>
