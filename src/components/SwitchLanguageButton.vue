<template>
    <div id="switch_language_button">
        <a href="#" v-on:click.prevent="handleClick_changeLanguage('cn')">
            <div class="text_button">
                {{this.$i18n.locale}}
            </div>
        </a>
        <ul>
            <li>
                <a href="#" v-on:click.prevent="handleClick_changeLanguage('cn')">
                {{this.$i18n.locale}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'SwitchLanguageButton',
  data() {
    return {
      msg: 'お問い合わせ',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#question_button {

    width: 136px;
    height: 42px;

    top: 35px;
    background: $gradation-blue;
    box-shadow: $box-shadow-button;
    border-radius: 4px;

    a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    a:hover {
        background: $color-hover;
        border-radius: 4px;
    }
    a:active {
        background: #004AD7;
        border-radius: 4px;
    }


    ul{
      border-radius: 4px;
      position: absolute;
      top: -350px;
      transition: all .3s ease;
      -webkit-transition: all .3s ease;
      padding: 0;
      padding-top: 3vh;
      margin: 0;
      background-color: rgba(255,255,255,0.7);
      width: 136px;
      height: 72px;
    }
    &:hover ul{
      top: 8vh;
    }
}

.text_button {
    color: $color-white;

    width: 132px;
    height: 20px;
    left: calc(50% - 132px/2);
    top: calc(50% - 20px/2);

    @include poppins-font-001em(13px, 600);
    text-align: center;
}
</style>
