<template>
  <a
    v-bind:id="id"
    v-bind:href="`##${controlId}`"
    role="tab"
    v-bind:aria-controls="controlId"
    v-bind:aria-selected="isActive"
    class="prevent-measure-link"
    v-bind:class="{ active: isActive }"
    v-on:click="onClick"
  >
    <span
      class="logo"
      v-bind:class="[logoClass]"
    />

    <span class="label">{{ label }}</span>
  </a>
</template>

<script>
export default {
  name: 'PreventMeasureTabLink',
  props: {
    id: String,
    controlId: String,
    logoClass: String,
    isActive: Boolean,
    onClick: Function,
    label: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

.prevent-measure-link {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: background-color .3s ease;

  .logo {
    width: 24px;
    height: 24px;
    background-color: $color-gray;
    transition: background-color .3s ease;

    &.outdoor {
      mask-image: url('../assets/image/outdoor.svg');
    }

    &.dining {
      mask-image: url('../assets/image/dining.svg');
    }

    &.indoor {
      mask-image: url('../assets/image/indoor.svg');
    }

    &.traffic {
      mask-image: url('../assets/image/traffic.svg');
    }

    &.work {
      mask-image: url('../assets/image/work.svg');
    }
  }

  .label {
    @include noto-font-001em(16px, bold);
    margin-top: 8px;
    color: $color-gray;
  }

  &:hover,
  &.active {
    background-color: $color-white;

    .logo {
      background-color: $color-navy;
    }

    .label {
      color: $color-navy;
    }
  }

  &:hover {
    background-color: transparent;
  }

  &.active:hover {
    background-color: $color-white;
  }
}
</style>
