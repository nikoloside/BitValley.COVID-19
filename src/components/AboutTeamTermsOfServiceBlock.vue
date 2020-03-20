<template>
  <div id="AboutTeamTermsOfServiceBlock">
    <ul class="tab-link-list" role="tablist">
      <li class="tab-link-wrapper" role="presentation">
        <a
          id="about-team-link"
          href="##about-team-panel"
          role="tab"
          aria-controls="about-team-link"
          v-bind:aria-selcted="isAboutTeamTabActive"
          class="tab-link"
          v-on:click="onAboutTeamTabLinkClick"
          v-bind:class="{ active: isAboutTeamTabActive }"
        >
          BitValley-Meliponinae
        </a>
      </li>
      <li class="tab-link-wrapper" role="presentation">
        <a
          id="terms-of-service-link"
          href="##terms-of-service-panel"
          role="tab"
          aria-controls="terms-of-service-panel"
          v-bind:aria-selected="isTermsOfServiceTabActive"
          class="tab-link"
          v-on:click="onTermsOfServiceTabClick"
          v-bind:class="{ active: isTermsOfServiceTabActive }"
        >
          利用規約
        </a>
      </li>
    </ul>

    <p
      id="about-team-panel"
      aria-labelledby="about-team-link"
      role="tabpanel"
      v-bind:aria-hidden="!isAboutTeamTabActive"
      class="tab-panel"
      v-bind:class="{ active: isAboutTeamTabActive }"
    >
      コロナ対策について、小さくても何か力になりたいと思います。
      <br />
      日本に住む皆様が一刻も早く安心して暮らせるよう、心より願っております。
    </p>
    <p
      id="terms-of-service-panel"
      aria-labelledby="terms-of-service-link"
      role="tabpanel"
      v-bind:aria-hidden="!isTermsOfServiceTabActive"
      class="tab-panel"
      v-bind:class="{ active: isTermsOfServiceTabActive }"
    >
      コロナ対策について、小さくても何か力になりたいと思います。
      <br />
      日本に住む皆様が一刻も早く安心して暮らせるよう、心より願っております。
      <br />
      コロナ対策について、小さくても何か力になりたいと思います。
      <br />
      日本に住む皆様が一刻も早く安心して暮らせるよう、心より願っております。
      <br />
      コロナ対策について、小さくても何か力になりたいと思います。
      <br />
      日本に住む皆様が一刻も早く安心して暮らせるよう、心より願っております。
      <br />
    </p>
  </div>
</template>

<script>
const ABOUT_TEAM_TAB = 'about-team';
const TERMS_OF_SERVICE_TAB = 'terms-of-service';

export default {
  name: 'AboutTeamTermServiceBlock',
  data() {
    return {
      activeTab: ABOUT_TEAM_TAB,
    };
  },
  computed: {
    isAboutTeamTabActive() {
      return this.activeTab === ABOUT_TEAM_TAB;
    },
    isTermsOfServiceTabActive() {
      return this.activeTab === TERMS_OF_SERVICE_TAB;
    },
  },
  methods: {
    onAboutTeamTabLinkClick() {
      this.activeTab = ABOUT_TEAM_TAB;
    },
    onTermsOfServiceTabClick() {
      this.activeTab = TERMS_OF_SERVICE_TAB;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

#AboutTeamTermsOfServiceBlock {
  background-color: $color-blightgray;
  padding: 32px 16px;

  .tab-link-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
  }

  .tab-link-wrapper:not(:last-of-type) {
    padding-right: 16px;
    margin-right: 16px;
    border-right: 2px solid $color-palegray;
  }

  .tab-link {
    @include noto-font-001em(16px, bold);
    color: $color-gray;

    &:hover,
    &.active {
      color: $color-darkgray;
    }
  }

  .tab-panel {
    @include noto-font-001em(12px, normal);
    margin: 16px 0 0;
    text-align: center;
    color: $color-darkgray;
    display: none;

    &.active {
      display: block;
    }
  }
}
</style>
