<template>
    <div id="question_button">
        <a href="mailto:bitvalley.meliponinae@gmail.com">
            <div class="text_button">
                {{ $t("messages.headerquestionbutton") }}
            </div>
        </a>
    </div>
</template>

<script>
export default {
  name: 'QuestionButton',
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
