<template>
  <ul id="SharePanel">
    <li>
      <a
        aria-label="Twitterでシェアする"
        class="twitter-share"
        target="_blank"
        v-bind:href="twitterShareUrl"
      />
    </li>
    <li>
      <a
        aria-label="Facebookでシェアする"
        class="facebook-share"
        target="_blank"
        v-bind:href="facebookShareUrl"
      />
    </li>
    <li>
      <a
        aria-label="Weiboでシェアする"
        class="weibo-share"
        target="_blank"
        v-bind:href="weiboShareUrl"
      />
    </li>
  </ul>
</template>

<script>

export default {
  name: 'SharePanel',
  data() {
    return {
      SHARE_URL: 'https://survival-jp.com',
      SHARE_TEXT: '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ',
      SHARE_TEXT_CN: 'https://survival-jp.com 「日本疫情指南」面向在日华人的日本新冠疫情信息网站——“日本疫情指南”, 查看日本新冠肺炎感染数据，还能通过地图来查找身边有没有感染病例，同时提供新冠肺炎相关新闻的更新，世界疫情发展数据。 #再见吧新冠菌 #日本疫情指南 #日本疫情',
      SHARE_PIC_CN: 'https://res.cloudinary.com/df6wesepg/image/upload/v1588696192/promotion/OGP_cn_j2ddbv.png',
    };
  },
  computed: {
    twitterShareUrl() {
      return `https://twitter.com/intent/tweet?${
        new URLSearchParams([['url', this.SHARE_URL], ['text', this.SHARE_TEXT]])
      }`;
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams([['u', this.SHARE_URL]])
      }`;
    },
    weiboShareUrl() {
      return `http://service.weibo.com/share/share.php?${
        new URLSearchParams([['u', this.SHARE_URL], ['title', this.SHARE_TEXT_CN], ['pic', this.SHARE_PIC_CN]])
      }`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
#SharePanel {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li:not(:last-of-type) {
    margin-right: 24px;
  }

  .twitter-share,
  .facebook-share,
  .weibo-share {
    display: block;
    width: 30px;
    height: 30px;
    background-color: $color-black;
    -webkit-mask-size: cover;
    mask-size: cover;
    transition: background-color .3s ease;

    &:hover {
      background-color: $color-blue;
    }
  }

  .twitter-share {
    -webkit-mask-image: url('../assets/image/twitter.svg');
    mask-image: url('../assets/image/twitter.svg');
  }

  .facebook-share {
    -webkit-mask-image: url('../assets/image/facebook.svg');
    mask-image: url('../assets/image/facebook.svg');
  }

  .weibo-share {
    -webkit-mask-image: url('../assets/image/weibolink.svg');
    mask-image: url('../assets/image/weibolink.svg');
  }
}
</style>
