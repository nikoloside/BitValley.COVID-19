<template>
    <div id="question_button">
        <a href="/">
            <div class="text_button">
                {{ msg }}
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
    margin-right: 32px;

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
        text-decoration: none;
    }
    a:hover {
        background: $color-hover;
    }
}

.text_button {
    color: $color-white;

    width: 132px;
    height: 20px;
    left: calc(50% - 132px/2);
    top: calc(50% - 20px/2);

    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 19px;
    /* identical to box height */

    text-align: center;
    letter-spacing: 0.01em;
}
</style>
