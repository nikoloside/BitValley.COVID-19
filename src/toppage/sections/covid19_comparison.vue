<template>
  <div id="covid19-comparison">
    <div class="comparison-catchcopy">
      風邪、インフルエンザ、新型コロナウイルスの症状には類似点が多いです。
      発熱、倦怠感、咳などの症状があれば、必ず新型コロナウイルスに感染されたというわけではありません。
      コロナウイルス感染を疑う時、次のテーブルで風邪とインフルエンザの症状と比較して区別しましょう。
    </div>
    <div class="wrap-shadow">
      <table class="comparison-table">
      <tbody>
          <tr class="text-primary">
              <th class="lt">症状</th>
              <td>風邪</td>
              <td>インフルエンザ</td>
              <td class="rt">コロナウィルス</td>
          </tr>
          <tr class="alt">
              <th>発熱</th>
              <td>少ない</td>
              <td>
                <p class="text-red">よくある</p>
                <p class="text-light">普段より高い傾向、特に子どもの方が著しい。</p>
                <p class="text-light">3-4日続く</p>
              </td>
              <td class="text-red">よくある</td>
          </tr>
          <tr>
              <th>頭痛</th>
              <td>少ない</td>
              <td class="text-red">よくある</td>
              <td class="text-red">よくある</td>
          </tr>
          <tr class="alt">
              <th>全身の痛さ</th>
              <td>軽度</td>
              <td>
                <p class="text-red">よくある</p>
                <p class="text-light">通常強く感じられる</p>
              </td>
              <td class="text-red">よくある</td>
          </tr>
          <tr>
              <th>だるさ・疲労、倦怠感</th>
              <td>時々</td>
              <td>
                <p class="text-red">よくある</p>
                <p class="text-light">2-3週続く</p>
              </td>
              <td class="text-red">よくある</td>
          </tr>
          <tr class="alt">
              <th>強い怠さ、疲労、倦怠感</th>
              <td>なし</td>
              <td>
                <p class="text-red">よくある</p>
                <p class="text-light">通常発熱が始まる時に出る</p>
              </td>
              <td class="text-red">よくあるが、一部の患者は軽い怠さである</td>
          </tr>
          <tr>
              <th>鼻詰まり</th>
              <td class="text-red">よくある</td>
              <td>時々</td>
              <td>少ない</td>
          </tr>
          <tr class="alt">
              <th>くしゃみ</th>
              <td class="text-red">よくある</td>
              <td>時々</td>
              <td>少ない</td>
          </tr>
          <tr>
              <th>喉の痛み</th>
              <td class="text-red">よくある</td>
              <td>時々</td>
              <td>少ない</td>
          </tr>
          <tr class="alt">
              <th>胸の違和感・咳</th>
              <td>軽度/乾いた咳</td>
              <td>軽/中度・重度になる可能性がある</td>
              <td>胸の違和感/乾いた咳はよくある</td>
          </tr>
          <tr>
              <th class="lb">肺炎</th>
              <td>とても少ない</td>
              <td>少ない</td>
              <td class="text-red">よくあるが、一部の患者には肺炎の症状がない</td>
          </tr>
      </tbody>
      </table>
    </div>
    <div class="comparison-source-copyright">
      出典：丁香医生
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comparison',
  data() {
    return {
      msg: '这里是比较的页面',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";

#covid19-comparison {
  display: block;
  padding-bottom: 16px;
  margin: 0 24px;
  @media (max-width: $breakpoint-pc) {
    margin: 0 16px;
  }
}

.comparison-catchcopy {
  @include noto-font-001em(16px, bold);
  padding: 8px 0px;
  text-align: left;
  @media (max-width: $breakpoint-pc) {
    @include noto-font-001em(14px, normal);
  }
}

.comparison-source-copyright{
  @include noto-font-001em(14px, normal);
  color: $color-lightgray;
  text-align: left;
  padding: 0px 0px;
}
.comparison-table {
  border-collapse:  collapse; /* セルの線を重ねる */
  width:  100%;               /* 幅指定 */
  table-layout: fixed;        /* セルの幅計算指定 */
  margin: 16px 0;

  th,td {
    @include noto-font-001em(16px, 500);
    color: #000000;
    height: 45px;
    text-align: center;
    vertical-align: middle;
    p {
      margin: 0;
    }
    padding:8px 0;
  }

  th {
    @include noto-font-001em(14px, 500);
    background-color: $color-primary;
    color: $color-white;
    width: 232px;
    @media (max-width: $breakpoint-pc) {
      width: 142px;
    }
    @media (max-width: $breakpoint-sp) {
      width: auto;
    }
  }

  .lt {
    @include noto-font-001em(16px, bold);
    border-radius: 12px 0px 0px 0px;
  }
  .lb {
    border-radius: 0px 0px 0px 12px;
  }
  .rt {
    border-radius: 0px 12px 0px 0px;
  }
  .alt {
    td{
      background-color:#E8ECF2;
    }
  }
  .text-primary {
    td{
      @include noto-font-001em(16px, bold);
      color: $color-primary;
    }
  }
  .text-red {
   @include noto-font-001em(14px, bold);
   color: $color-red;
  }
  .text-light {
   @include noto-font-001em(12px, 500);
   color: $color-black;
  }
}
</style>
