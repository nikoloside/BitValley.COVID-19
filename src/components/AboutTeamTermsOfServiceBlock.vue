/* eslint-disable import/no-unresolved */
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
          {{ $t("messages.aboutUsTitle") }}
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
          {{ $t("messages.rulesTitle") }}
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
      {{ $t("messages.aboutUs1") }}
      <br />
      {{ $t("messages.aboutUs2") }}
      <br />
      {{ $t("messages.aboutUs3") }}
      <br />
    </p>
    <p
      id="terms-of-service-panel"
      aria-labelledby="terms-of-service-link"
      role="tabpanel"
      v-bind:aria-hidden="!isTermsOfServiceTabActive"
      class="tab-panel"
      v-bind:class="{ active: isTermsOfServiceTabActive }"
    >
      <strong>{{ $t("messages.rulesTitle") }}</strong>
      <br />
      {{$t("messages.rulesDataSource1")}}
      <br />
      {{$t("messages.rulesDataSource2")}}
      <br />
      {{$t("messages.rulesDataSource3")}}
      <br />
      {{$t("messages.rulesDataSource4")}}
      <br />
      <strong>{{$t("messages.rulesUsageTitle")}}</strong>
      <br />
      {{$t("messages.rulesUsage1")}}
      <br />
      {{$t("messages.rulesUsage2")}}
      <br />
      {{$t("messages.rulesUsage3")}}
      <br />
      <br />
    </p>
    <div class="logo-koi">
      <img src="../assets/image/koi.png"
        srcset="../assets/image/koi.png 1x,
             ../assets/image/koi@2x.png 2x"
     alt="Example image" />
    </div>
  </div>
</template>

<script>
const ABOUT_TEAM_TAB = 'about-team';
const TERMS_OF_SERVICE_TAB = 'terms-of-service';

const photos = {
  // eslint-disable-next-line global-require
  1: require('../assets/image/koi.png'),
  // eslint-disable-next-line global-require
  2: require('/assets/image/koi@2x.png'),
};

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
    photos() {
      return photos;
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
    color: $color-darkgray;
    display: none;

    &.active {
      display: block;
    }
  }
}
#about-team-panel {
  text-align: center;
  @media (max-width: $breakpoint-sp) {
    text-align: left;
  }
}
#terms-of-service-panel {
  text-align: left;
}
</style>
