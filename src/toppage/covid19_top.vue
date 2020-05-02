<template>
  <div>
    <PickUp></PickUp>
    <div class="section-dashboard">
    <div class="section-japan">
      <div id="section-infect" class="section-wrapper wrap-shadow section-infect">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titlejapan") }}
        </div>
        <InfectNumber></InfectNumber>
      </div>

      <div id="section-region" class="section-wrapper wrap-shadow section-region">
        <div class="section">
          <div class="section-left" />{{ $t("messages.titleregion") }}
        </div>
        <InfectRegion />
      </div>
    </div>

    <div id="section-world" class="section-wrapper wrap-shadow section-world">
      <div class="section">
        <div class="section-left" />{{ $t("messages.titleworld") }}
      </div>
      <InfectWorld/>
    </div>
    </div>

    <div id="section-checkmap" class="section-wrapper wrap-shadow section-checkmap">
      <div class="section">
        <div class="section-left" />{{ $t("messages.titlecheckmap") }}
      </div>
      <CheckMap/>
    </div>

    <div id="section-news" class="section section-news">
      <div class="section-left" />{{ $t("messages.titlenews") }}
    </div>
    <News></News>
    <div class="section-readmore">
      <router-link class="newsReadmore" to="/news" v-scroll-to="'#covid19-article'">
        {{ $t("messages.newsreadmore") }}
      </router-link>
    </div>

  </div>
</template>

<script>
import PickUp from '@/toppage/sections/covid19_pickup';
import InfectNumber from '@/toppage/sections/covid19_infect_number';
import InfectRegion from '@/toppage/sections/covid19_infect_region';
import InfectWorld from '@/toppage/sections/covid19_infect_world';
import CheckMap from '@/toppage/sections/covid19_check_map';
import News from '@/toppage/sections/covid19_news';

export default {
  name: 'TopPage',
  components: {
    PickUp,
    InfectNumber,
    InfectRegion,
    InfectWorld,
    CheckMap,
    News,
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
@import "@/commons/_variables.scss";

// ver1.2仕様 必须通过列表进行切换
.section-dashboard {
  display: flex;
  @media (max-width: $breakpoint-pc) {
    flex-direction: column;
  }
}
.section-japan {
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: $breakpoint-pc) {
    width:100%;
  }
}
.section-infect {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-region {
  .section {
    margin-left: 0px;
  }
  margin: 12px 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 12px 16px;
  }
}
.section-world {
  .section {
    margin-left: 0px;
  }
  width: 50%;
  margin-left:0px;
  margin-right:24px;
  margin-top: 12px;
  margin-bottom: 12px;
  @media (max-width: $breakpoint-pc) {
    width: auto;
    margin: 12px 16px;
  }
}

.section-checkmap {
  .section {
    margin-left: 0;
  }
}

.additional-topinfo {
  @include noto-font-001em(14px, bold);
  padding: 0;
  margin: 8px 0;
  color: $color-gray;
  position: absolute;
  top: -48px;
  right: 0px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}

.additional-info {
  @include noto-font-001em(14px, normal);
  padding: 0;
  margin: 8px 0;
  color: $color-lightgray;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: $breakpoint-sp) {
    @include noto-font-001em(10px, normal);
    margin: 4px 0;
  }
}

.section-readmore {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .newsReadmore {
    width: 115px;
    height: 42px;
    margin-bottom: 48px;
    padding: 18px 0;

    display: flex;
    justify-content: center;
    align-items: center;
    @include noto-font-001em(14px, bold);
    line-height: 200%;
    color: $color-gray;

    border: 2px solid $color-gray;
    box-sizing: border-box;
    border-radius: 22px;
    transition: color 0.3 ease;
    transition: all 0.3 ease;
    &:hover {
        color: $color-lightgray;
        border: 2px solid $color-lightgray;
    }
  }
}
</style>
