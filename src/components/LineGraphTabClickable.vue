<template>
  <a
    :id="id"
    :href="`##${apiId}`"
    role="tab"
    :aria-controls="apiId"
    :aria-selected="isActive"
    class="line-graph-tab"
    :class="[bgClass, { active: isActive }]"
    @click="onClick"
  >
    <div class="tab-title">
      {{ $t(label) }}
    </div>

    <div class="tab-number">
      {{ normalizeTotalPersons }}
    </div>

    <div class="tab-diff flex-container-start">
        <div
        class="tab-number-color"
        v-bind:style="{ 'color': `${ diffColor }` }"
        >
            前日比{{ normalizeDiffPersons }}
        </div>
        <div class="tab-color">
            <img :src="diffIcon">
        </div>
    </div>

  </a>
</template>

<script>
import increaseIcon from '../assets/image/increase_simple.svg';
import decreaseIcon from '../assets/image/decrease_simple.svg';
import equalizeIcon from '../assets/image/equalize_simple.svg';

export default {
  name: 'LineGraphTab',
  props: {
    id: String,
    apiId: String,
    bgClass: String,
    label: String,
    isActive: Boolean,
    onClick: Function,
    totalPersons: Number,
    diffPersons: Number,
  },
  data() {
    return {
      total: Number(this.totalPersons),
      diff: Number(this.diffPersons),
    };
  },
  watch: {
    totalPersons() {
      this.total = Number(this.totalPersons);
      this.handleClick = this.onClick;
    },
    diffPersons() {
      this.diff = Number(this.diffPersons);
    },
  },
  computed: {
    normalizeTotalPersons() {
      const { total } = this;
      return total.toLocaleString();
    },
    normalizeDiffPersons() {
      const { diff } = this;
      let sign = '';
      if (diff >= 0) {
        sign = '+';
      } else if (diff < 0) {
        sign = '';
      }
      return sign + diff.toLocaleString();
    },
    diffColor() {
      const { diff } = this;
      if (diff > 0) {
        return '#FA5292';
      } else if (diff < 0) {
        return '#31D9A5';
      }
      return '#0452E6';
    },
    diffIcon() {
      const { diff } = this;
      if (diff > 0) {
        return increaseIcon;
      } else if (diff < 0) {
        // eslint-disable-next-line global-require
        return decreaseIcon;
      }
      // eslint-disable-next-line global-require
      return equalizeIcon;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";


.tab-title {
  @include noto-font-001em(14px, normal);
  color: $color-black;
  text-align: center;
}
.tab-number {
  @include noto-font-001em(20px, bold);
  color: $color-black;
  text-align: center;
  margin:2px 0;
}
.tab-diff {
  display: flex;
  align-items: center;
  justify-content: center;
  .tab-number-color {
    @include poppins-font(12px, bold);
    color: $color-pink;
    margin-right: 6px;
  }
  .tab-color {
    display: flex;
    width: 12px;
    height: 8px;
    img {
      width: 100%;
      height: auto;
    }
  }
}

.line-graph-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: background-color .3s ease;
  background: linear-gradient(180deg, rgba(232, 236, 242, 0) 0%, rgba(232, 236, 242, 0.49) 100%);
  padding: 12px 0px;

  &.lt {
    border-radius: 12px 0px 0px 0px;
  }

  &.ct {
    border-radius: 0px 0px 0px 0px;
  }

  &.rt {
    border-radius: 0px 12px 0px 0px;
  }

  &.lb {
    border-radius: 0px 0px 0px 12px;
  }

  &.cb {
    border-radius: 0px 0px 0px 0px;
  }

  &.rb {
    border-radius: 0px 0px 12px 0px;
  }

  &.none {
    border-radius: 0px 0px 12px 0px;
    background: transparent;
    cursor: default;
    pointer-events: none;

    &:hover {
      background: transparent;
    }
  }

  &:hover,
  &.active {
    background: #E8ECF2;
    .tab-title {
      @include noto-font-001em(14px, bold);
    }
  }

  &:hover {
  background: linear-gradient(180deg, rgba(232, 236, 242, 0) 0%, rgba(232, 236, 242, 0.49) 30%);
  }

  &.active:hover {
    background: #E8ECF2;
    .tab-title {
      @include noto-font-001em(14px, bold);
    }
  }
}

</style>
