<template>
  <div id="DashBoardMedium" class="wrap-shadow">
    <div class="wrap-dashboard flex-container-spacebetween flex-direction-column">
      <div class="DashBoardUpper flex-container-spacebetween">
        <div class="DashBoardTitle">
          {{ BoardTitle }}
        </div>
        <div
          class="DashBoardNumberColor"
          v-bind:style="{ 'color': `${ diffColor }` }"
        >
          {{ normalizeDiffPersons }}
        </div>
      </div>
      <div class="DashBoardDowner flex-container-spacebetween">
        <div class="DashBoardNumberBlack">
          {{ normalizeTotalPersons }}
        </div>
        <div class="DashBoardIcon">
            <img :src="diffIcon">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import increaseIcon from '../assets/image/increase.svg';
import decreaseIcon from '../assets/image/decrease.svg';
import equalizeIcon from '../assets/image/equalize.svg';

export default {
  name: 'DashBoardMedium',
  data() {
    return {
      BoardTitle: '日本昨日感染人数',
      TotalPersons: 9999,
      DiffPersons: -9999,

    };
  },
  props: ['request', 'title'],
  mounted() {
    this.BoardTitle = this.title;
    const url = `https://api.survival-jp.com/api/patient/${this.request}`;
    axios.get(url)
      .then((response) => {
        this.TotalPersons = response.data.data.Current;
        this.DiffPersons = response.data.data.Diff;
      });
  },
  computed: {
    normalizeTotalPersons() {
      const { TotalPersons } = this;
      return TotalPersons.toLocaleString();
    },
    normalizeDiffPersons() {
      const { DiffPersons } = this;
      let sign = '';
      if (DiffPersons > 0) {
        sign = '+';
      } else if (DiffPersons < 0) {
        sign = '';
      }
      return sign + DiffPersons.toLocaleString();
    },
    diffColor() {
      const { DiffPersons } = this;
      if (DiffPersons > 0) {
        return '#FA5292';
      } else if (DiffPersons < 0) {
        return '#31D9A5';
      }
      return '#0452E6';
    },
    diffIcon() {
      const { DiffPersons } = this;
      if (DiffPersons > 0) {
        return increaseIcon;
      } else if (DiffPersons < 0) {
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
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#DashBoardMedium {
    display: flex;
    background-color: $color-background;
    border-radius: 12px;
    min-width: 206px;
    width: 100%;
    height: 97px;

    margin-right: 24px;
    @media (max-width: $breakpoint-pc) {
      margin-right: 16px;
      margin-bottom: 16px;
      &:last-child{
        margin-right: 0;
      }
    }

    .wrap-dashboard {
        width: 100%;
        padding: 16px 16px;
    }

    .DashBoardUpper {
        width: 100%;
        height: 21px;

        .DashBoardTitle {
            @include noto-font-001em(14px, bold);
            color: $color-black;
        }
        .DashBoardNumberColor {
            @include poppins-font(14px, bold);
            align-items: right;
            color: $color-pink;
        }
    }
    .DashBoardDowner {
        width: 100%;
        height: 36px;

        .DashBoardNumberBlack {
            @include poppins-font(24px, bold);
            display: flex;
            color: $color-black;
        }
        $IconWidth: 58px;
        $IconHeight: 36px;
        .DashBoardIcon {
            width: $IconWidth;
            height: $IconHeight;
            //background-position: center;
            img {
                position: relative;
                top: -$IconHeight/2;
                left: -$IconWidth/2;
            }
        }
    }
}
</style>
