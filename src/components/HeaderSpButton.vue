<template>
  <div class="SpHeader-modal-window">
    <button
     :class="[ isMenuActive ? 'menu-trigger active' : 'menu-trigger' ]"
     @click="triggerModal"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- コンポーネント MyModal -->
    <HeaderSpModal @close="triggerModal" v-if="spmodal">
    </HeaderSpModal>
  </div>
</template>

<script>
import HeaderSpModal from './HeaderSpModal';

export default {
  components: { HeaderSpModal },
  data() {
    return {
      spmodal: false,
      isMenuActive: false,
    };
  },
  methods: {
    triggerModal() {
      if (this.spmodal) {
        this.spmodal = false;
        this.isMenuActive = false;
      } else {
        this.spmodal = true;
        this.isMenuActive = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/commons/_variables.scss";

.menu-trigger,
.menu-trigger span {
  transition: all .4s;
  box-sizing: border-box;
}
.menu-trigger {
  position: absolute;
  width:  24px;
  height: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 41;
  &:hover {
    opacity: 1.0;
  }
}
.menu-trigger span {
  display: inline-block;
  position: absolute;
  left: 0;
  height: 3px;
  background-color: $color-black;
}
.menu-trigger span:nth-of-type(1) {
  top: 0;
  width: 100%;
}
.menu-trigger span:nth-of-type(2) {
  top: 11px;
  width: 100%;
}
.menu-trigger span:nth-of-type(3) {
  bottom: -1px;
  width: 100%;
}
.menu-trigger.active span:nth-of-type(1) {
  -webkit-transform: translateY(10px) rotate(-45deg);
  transform: translateY(10px) rotate(-45deg);
  width: 100%;
  background-color: $color-white;
}
.menu-trigger.active span:nth-of-type(2) {
  opacity: 0;
}
.menu-trigger.active span:nth-of-type(3) {
  -webkit-transform: translateY(-12px) rotate(45deg);
  transform: translateY(-12px) rotate(45deg);
  width: 100%;
  background-color: $color-white;
}
</style>
