<template>
  <div id="PreventMeasureBlock">
    <ul class="tab-link-list" role="tablist">
      <li>
        <PreventMeasureTabLink
          id="outdoor-measure-link"
          control-id="outdoor-measure-panel"
          logo-class="outdoor"
          label="外出"
          v-bind:is-active="isOutdoorTabActive"
          v-bind:on-click="onOutdoorTabLinkClick"
        />
      </li>
      <li>
        <PreventMeasureTabLink
          id="dining-measure-link"
          control-id="dining-measure-panel"
          logo-class="dining"
          label="食事"
          v-bind:is-active="isDiningTabActive"
          v-bind:on-click="onDiningTabLinkClick"
        />
      </li>
      <li>
        <PreventMeasureTabLink
          id="indoor-measure-link"
          contorl-id="indoor-measure-panel"
          logo-class="indoor"
          label="在宅"
          v-bind:is-active="isIndoorTabActive"
          v-bind:on-click="onIndoorTabLinkClick"
        />
      </li>
      <li>
        <PreventMeasureTabLink
          id="traffic-measure-link"
          contorl-id="traffic-measure-panel"
          logo-class="traffic"
          label="移動"
          v-bind:is-active="isTrafficTabActive"
          v-bind:on-click="onTrafficTabLinkClick"
        />
      </li>
      <li>
        <PreventMeasureTabLink
          id="work-measure-link"
          control-id="work-measure-panel"
          logo-class="work"
          label="職場"
          v-bind:is-active="isWorkTabActive"
          v-bind:on-click="onWorkTabLinkClick"
        />
      </li>
    </ul>

    <PreventMeasureTabPanel
      id="outdoor-measure-panel"
      labelledby="outdoor-measure-link"
      v-bind:is-active="isOutdoorTabActive"
    >
      <template v-slot:description>
        <h3>
          電車やバスの乗用
        </h3>

        <p>
          1.ドアノブや電車のつり革など様々なものに触れることにより、自分の手にもウイルスが付着している可能性があります。
          <br />
          外出先からの帰宅時や調理の前後、食事前など<strong>こまめに手を洗います。</strong>
          <br />
          <br />
          2.乗り換え案内アプリを活用することで、普段の通勤電車や、イベントなどに伴う混雑も回避できるかもしれません。
          <br />
          <br />
          3.乗車前から降車まで<strong>マスクを着用しましょう。</strong>
          <br />
          また、途中マスクを<strong>外してはいけません。</strong>
          <br />
          <br />
          4.電車のつり革などに触れることがあるので、<strong>手袋の着用も考えられます。</strong>また、手袋を脱いだ後、すぐにアルコールなどで手を洗いましょう。
          <br />
          <br />
          5.乗車中、マスクを着用してなく、咳やくしゃみをする時、
          <br />
          ティッシュ・ハンカチで口・鼻を覆うこと。
          <br />
          <strong>とっさの時、袖で口・鼻を覆うこと。</strong>
        </p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/outdoor.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          1 首相官邸: 新型コロナウイルス感染症に備えて ～一人ひとりができる対策を知っておこう～(https://www.kantei.go.jp/jp/headline/kansensho/coronavirus.html)
          <br />
          2 HUFFPOST: 新型コロナウイルスの感染予防にも…人でぎっしりの満員電車を避けるために使える方法 (https://www.huffingtonpost.jp/entry/konzatsu-kaihi_jp_5e4b2c15c5b6eb8e95b15b3a)
          <br />
          3 中国疾控中心
          <br />
          4 中国疾控中心
          <br />
          5 首相官邸・厚生労働省・中国疾控中心
        </p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="dining-measure-panel"
      labelledby="dining-measure-link"
      v-bind:is-active="isDiningTabActive"
    >
      <template v-slot:description>
        <h3>食事</h3>
        <p>食事</p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/dining.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>食事出典</p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="indoor-measure-panel"
      labelledby="indoor-measure-link"
      v-bind:is-active="isIndoorTabActive"
    >
      <template v-slot:description>
        <h3>在宅</h3>
        <p>在宅</p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/indoor.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>在宅出典</p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="traffic-measure-panel"
      labelledby="traffic-measure-link"
      v-bind:is-active="isTrafficTabActive"
    >
      <template v-slot:description>
        <h3>移動</h3>
        <p>移動</p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/traffic.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>移動出典</p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="work-measure-panel"
      labelledby="work-measure-link"
      v-bind:is-active="isWorkTabActive"
    >
      <template v-slot:description>
        <h3>職場</h3>
        <p>職場</p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/work.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>職場出典</p>
      </template>
    </PreventMeasureTabPanel>
  </div>
</template>

<script>
import PreventMeasureTabLink from '@/components/PreventMeasureTabLink';
import PreventMeasureTabPanel from '@/components/PreventMeasureTabPanel';

const TAB = {
  OUTDOOR: 'outdoor',
  DINING: 'dining',
  INDOOR: 'indoor',
  TRAFFIC: 'traffic',
  WORK: 'work',
};

export default {
  name: 'PreventMeasureBlock',
  components: { PreventMeasureTabLink, PreventMeasureTabPanel },
  data() {
    return {
      activeTab: TAB.OUTDOOR,
    };
  },
  computed: {
    isOutdoorTabActive() {
      return this.activeTab === TAB.OUTDOOR;
    },
    isDiningTabActive() {
      return this.activeTab === TAB.DINING;
    },
    isIndoorTabActive() {
      return this.activeTab === TAB.INDOOR;
    },
    isTrafficTabActive() {
      return this.activeTab === TAB.TRAFFIC;
    },
    isWorkTabActive() {
      return this.activeTab === TAB.WORK;
    },
  },
  methods: {
    onOutdoorTabLinkClick() {
      this.activeTab = TAB.OUTDOOR;
    },
    onDiningTabLinkClick() {
      this.activeTab = TAB.DINING;
    },
    onIndoorTabLinkClick() {
      this.activeTab = TAB.INDOOR;
    },
    onTrafficTabLinkClick() {
      this.activeTab = TAB.TRAFFIC;
    },
    onWorkTabLinkClick() {
      this.activeTab = TAB.WORK;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";

#PreventMeasureBlock {
  margin: 24px;

  .tab-link-list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    width: 100%;
    height: 84px;
    border-radius: 12px;
    background-color: $color-palegray;
    box-shadow: $box-shadow-wrap;

    > li {
      width: 20%;
    }
  }
}
</style>
