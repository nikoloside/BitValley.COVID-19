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
      渋谷で働いているエンジニア・デザイナーチームです。
      <br />
      世界中に感染拡大が続く新型コロナウイルスに対し、小さくとも何かお力添えいただきたく存じます。
      <br />
      日本に住む皆様が一刻も早く安心して暮らせるよう、心から願っております。
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
      <strong>本サイトのデータソースについて</strong>
      <br />
      本サイト感染人数に関するデータは厚生労働省の発表する情報を基に更新しております。
      <br />
      本サイト感染症状及び予防対策内容については、日本と中国の政府機関と医療企業が提供する情報を基に更新しております。
      <br />
      当サイトでは、速報性よりも信頼性を重要視しますが、情報を迅速にお伝えするために上記に限らず下記の場合により情報を追加編集削除する場合があります。
      <br />
      なお、その場合でも上記の一次情報源が公開され次第、可及的速やかに一次情報源との整合性確認ならびに情報源の差替公開を行うものとします。
      <br />
      <strong>情報の利用について</strong>
      <br />
      本サイトで公開しているすべての情報について、閲覧者は無償でご覧頂くことができます。
      <br />
      本サイトに掲載されているデータ、感染症状及び予防対策の内容は、全て必ず正しいと限れれません。
      特に、中国からの感染症状及び予防対策に関する情報は日本での状況に適用できない場合があります。ご参考の際は、ご注意ください。
      <br />
      本サイトの製作者は利用者が本サイトの情報を用いて行う一切の行為について責任を負うものではありません。
      <br />
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
