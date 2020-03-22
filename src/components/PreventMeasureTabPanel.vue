<template>
  <article
    v-bind:id="id"
    v-bind:aria-labelledby="labelledby"
    role="tabpanel"
    v-bind:aria-hidden="!isActive"
    class="tab-panel"
    v-bind:class="{ active: isActive }"
  >
    <div class="measure-description-image-group">
      <section class="measure-descirption">
        <slot name="description"></slot>
      </section>

      <div>
        <div class="measure-image-wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    </div>

    <footer class="measure-cite">
      <slot name="cite"></slot>
    </footer>
  </article>
</template>

<script>
export default {
  name: 'PreventMeasureTabPanel',
  props: {
    id: String,
    labelledby: String,
    isActive: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

.tab-panel {
  display: none;
  margin-top: 16px;
  padding: 40px 80px;
  border-radius: 12px;
  box-shadow: $box-shadow-wrap;

  @media (max-width: 960px) {
    padding: 40px 24px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }

  &.active {
    display: block;
  }

  .measure-description-image-group {
    display: flex;

    @media (max-width: 960px) {
      display: block;
    }
  }

  .measure-image-wrapper {
    flex: none;
    position: relative;
    width: 40vw;
    max-width: 516px;
    overflow: hidden;
    margin: auto;

    &::before {
      content: '';
      display: block;
      padding-bottom: 100%;
    }

    & > :first-of-type {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }

    @media (max-width: 960px) {
      margin-top: 24px;
      width: 100%;
      max-width: 356px;
    }
  }

  .measure-descirption {
    text-align: left;
    flex: auto;

    h3 {
      @include noto-font-001em(24px, bold);
      position: relative;
      margin: 0;
      color: $color-navy;

      @media (max-width: 960px) {
        @include noto-font-001em(16px, bold);
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -6px;
        width: 54px;
        height: 4px;
        border-radius: 2px;
        background-color: $color-navy;

        @media (max-width: 960px) {
          width: 36px;
        }
      }
    }

    p {
      @include noto-font-001em(16px, normal);
      margin: 32px 0 0;

      strong {
        font-weight: bold;
      }

      @media (max-width: 960px) {
        @include noto-font-001em(14px, normal);
      }
    }
  }

  .measure-cite {
    @include noto-font-001em(12px, normal);
    margin-top: 40px;
    text-align: left;
    color: $color-gray;
    word-break: break-word;

    h4 {
      font-weight: bold;
      margin: 0;
    }

    p {
      margin: 5px 0 0;
    }
  }
}
</style>
