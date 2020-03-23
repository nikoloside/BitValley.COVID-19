<template>
  <div id="PreventMeasureBlock">
    <ul class="tab-link-list" role="tablist">
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
          id="outdoor-measure-link"
          control-id="outdoor-measure-panel"
          logo-class="outdoor"
          label="外出"
          v-bind:is-active="isOutdoorTabActive"
          v-bind:on-click="onOutdoorTabLinkClick"
        />
      </li>
    </ul>

    <PreventMeasureTabPanel
      id="traffic-measure-panel"
      labelledby="traffic-measure-link"
      v-bind:is-active="isTrafficTabActive"
    >
      <template v-slot:description>
        <h3>
          電車やバスの乗用
        </h3>

        <p>
          <strong>1.</strong> ドアノブや電車のつり革など様々なものに触れることにより、
          <strong>自分の手にもウイルスが付着している可能性があります。</strong>
          <br />
          外出先からの帰宅時や調理の前後、食事前などこまめに手を洗います。
          <br />
          <br />
          <strong>2. 乗り換え案内アプリを活用することで、</strong>普段の通勤電車や、イベントなどに伴う混雑も回避できるかもしれません。
          <br />
          <br />
          <strong>3. </strong>乗車前から降車までマスクを着用しましょう。<strong>また、途中マスクを外してはいけません。</strong>
          <br />
          <br />
          <strong>4. </strong>電車のつり革などに触れることがあるので、<strong>手袋の着用も考えられます。</strong>
          また、手袋を脱いだ後、すぐにアルコールなどで手を洗いましょう。
          <br />
          <br />
          <strong>5. </strong>乗車中、マスクを着用してなく、咳やくしゃみをする時、ティッシュ・ハンカチで口・鼻を覆うこと。
          <strong>とっさの時、袖で口・鼻を覆うこと。</strong>
          <br />
          <br />
          <br />
          <br />
        </p>

        <h3>
          家庭用普通自動車の運転および乗用
        </h3>

        <p>
          <strong>1. </strong>風通しの良い場所で、車の窓を開け、温度に注意し、<strong>風邪をひかないように、換気しましょう。</strong>
          <br />
          <br />
          <strong>2. </strong>風通しの悪い地下駐車場などでは、車の窓を閉めましょう。また、車内エアコンの<strong>内気循環</strong>を使いましょう。
          <br />
          <br />
          <strong>3. 乗車前後、車のドアを開け、換気し、アルコールなどで手を洗い、</strong>車の席などを消毒しましょう。
          <br />
          <br />
          <strong>4. </strong>感染が疑われる人と同乗する時、<strong>医療用マスクの着用が必要です。</strong>なるべく、同乗の方と距離を空けてください。
          <br />
          また、車内エアコンの内気循環を使わないで、窓を適当に開けることで換気しましょう。
          <br />
          感染が疑われる人が降りた後、すぐに窓を開けて換気し、車内同乗者が触れた可能性があるところを消毒しましょう。
          <br />
          <br />
          <strong>5. </strong>感染された方が乗車した場合、感染者が降りた後、専門家に頼んで、
          <strong>車を徹底的に消毒しましょう</strong>（車の内装の表面、エアコンシステムなどが含まれます）。
          消毒する時、車の内気循環を使いましょう。<strong>消毒するまで、車を使用しないでください。</strong>
          <br />
        </p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/traffic.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          1-1.首相官邸ホームページ
          <br />
          1-2.ハフポスト
          <br />
          1-3.4. 中国疾病預防控制中心
          <br />
          1-5.首相官邸・厚生労働省・中国疾病預防控制中心
          <br />
          2-1.2.3.4.5. China Construction Bank University・Laihua Video
          <br />
        </p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="work-measure-panel"
      labelledby="work-measure-link"
      v-bind:is-active="isWorkTabActive"
    >
      <template v-slot:description>
        <h3>勤務空間</h3>

        <p>
          <strong>1. </strong>適時にマスクを着用しましょう。
          <br />
          <strong>2. </strong>手の清潔を保つように、注意しましょう。
          <br />
          <strong>3. </strong>時々窓を開けて、換気しましょう。
          <br />
          <strong>4. オフィス用品の清潔に注意しましょう。</strong>
          <br />
          <br />
          <br />
        </p>

        <h3>エレベーター</h3>

        <p>
          <strong>1. </strong>初めから終わりまでマスクの着用がおすすめです。
          <br />
          <strong>2. 押しボタンなど、エレベーター内に触れるのをなるべく控えましょう。</strong>
          <br />
          <strong>3. </strong>移動先まで、階数が低い場合は、エレベータの利用を遠慮してください。
          <br />
          <strong>4. 大人数の乗用を避けて、グループに分けて乗用しましょう。</strong>
          <br />
          <strong>5. </strong>なるべく、エレベーターを待つ時や乗用の際、同乗者と１メートルの距離を空けましょう。
          <br />
          <br />
          <br />
        </p>

        <h3>食堂</h3>

        <p>
          <strong>1. </strong>マスクの着用がおすすめです。
          <br />
          <strong>2. </strong>他の人と距離を空けましょう。
          <br />
          <strong>3. </strong>ピーク時を避けましょう。
          <br />
          <strong>4. なるべく、テイクアウトがおすすめです。</strong>
          <br />
          <br />
          <br />
        </p>

        <h3>会議</h3>

        <p>
          <strong>1. </strong>マスクの着用がおすすめです。
          <br />
          <strong>2. なるべく飲み物やカップなど自分で用意しましょう。</strong>
          <br />
          <strong>3. </strong>会議中、他の人と距離を空けましょう。
          <br />
          <strong>4. なるべく会議時間を短縮しましょう。</strong>
          <br />
          <strong>5. 時々窓を開けて、換気しましょう。</strong>
          <br />
          <strong>6. </strong>会議後、会議室を消毒しましょう。
          <br />
        </p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/work.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          Beijing Centre for Diseases Prevention and Control・Beijing Institute of Health Education
          <br />
          ・Shijingshan Disease Control Prevention Center Institute of Tuberculosis Control
          <br />
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

        <p>
          <strong>1. </strong>外出先からの帰宅時や調理の前後、食事前などこまめに手を洗います。
          <br />
          <br />
          <strong>2. 普段から、十分な睡眠とバランスのよい食事を心がけ、免疫力を高めておきます。</strong>
          <br />
          <br />
          <strong>3. 免疫力を保つために、タンパク質を含む食品</strong>
          （肉類/魚介類/卵/豆腐など）<strong>と善玉菌を増やす食品</strong>
          （ヨーグルト/乳酸菌飲料/発酵食品/野菜/果物/豆類/ごぼう/玉ねぎなど）<strong>を食べるのがおすすめです。</strong>
        </p>

      </template>

      <template v-slot:image>
        <img src="../assets/image/dining.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          1.2. 首相官邸ホームページ
          <br />
          3.日本調剤・厚生労働省.e-ヘルスネット.“たんぱく質”. “腸内細菌と健康”
          <br />
        </p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="indoor-measure-panel"
      labelledby="indoor-measure-link"
      v-bind:is-active="isIndoorTabActive"
    >
      <template v-slot:description>
        <h3>在宅</h3>
        <p>
          <strong>1. </strong>くしゃみや咳が出るとき、ティッシュなどを使用し、マスクを着用しましょう。
          <br />
          <br />
          <strong>2. 帰宅時、調理前後、食事の前、こまめ手洗いをすること。</strong>
          <br />
          <br />
          <strong>3. 日中はできるだけ窓を開け、換気しましょう。</strong>
          <br />
          <br />
          <strong>4. </strong>取っ手、ノブなどの共用する部分を消毒すること。
          <br />
          <br />
          <strong>5. </strong>汚れたリネン、衣服を早めに洗濯すること。
          <br />
          <br />
          <strong>6. ゴミは密閉して捨てましょう。</strong>
          <br />
          <br />
          <strong>7. 家族の中でタオル、食器などの日用品を共用しないこと。</strong>
          <br />
          <br />
          <strong>特に、感染者（感染疑いがある人を含む）のいる場合は:</strong>
          <br />
          <br />
          <strong>8. </strong>感染者との部屋を可能な限り分けましょう。
          <br />
          <br />
          <strong>9. </strong>感染者の世話をする人は、できるだけ限られた一人にしましょう。
          <br />
          <br />
          <strong>10.</strong>家族全員必ずマスクを着用しましょう。
          <br />
          <br />
          <strong>11. </strong>家族の中に発熱者がいる場合には、毎日体温を測りましょう。
          <br />
          <br />
          特に子供のいる家庭では、朝晩子供の体温を測り、注意しましょう。
          <br />
          <br />
        </p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/indoor.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          1.2.8 首相官邸ホームページ
          <br />
          3.4.5.6.9.10. 厚生労働省ホームページ
          <br />
          7.11.中国疾病預防控制中心
          <br />
        </p>
      </template>
    </PreventMeasureTabPanel>

    <PreventMeasureTabPanel
      id="outdoor-measure-panel"
      labelledby="outdoor-measure-link"
      v-bind:is-active="isOutdoorTabActive"
    >
      <template v-slot:description>
        <h3>外出</h3>
        <p>
          <strong>1.空気の流動性の悪い所や大勢の人が集まる所</strong>
          （温泉、映画館、カラオケ、空港、モール、駅、遊園地など）
          <strong>にできるだけ行かないでください。</strong>
          <br />
          <br />
          <strong>2.</strong>どうしても行く必要がある場合、
          可能な限り<strong>人との距離を置き、マスクを着用してください。</strong>
          <br />
          <br />
          <strong>3.風邪などの症状や、体調不良を感じられる方は外出を控えてください。</strong>
          <br />
        </p>
      </template>

      <template v-slot:image>
        <img src="../assets/image/outdoor.png" />
      </template>

      <template v-slot:cite>
        <h4>出典</h4>
        <p>
          1.2.中国疾病預防控制中心
          <br />
          3.東金市ホームページ
          <br />
        </p>
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
      activeTab: TAB.TRAFFIC,
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
