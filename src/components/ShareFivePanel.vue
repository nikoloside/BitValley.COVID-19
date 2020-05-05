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
    <li>
      <a
        aria-label="Wechatでシェアする"
        class="wechat-share"
        target="_blank"
        v-bind:href="wechatShareUrl"
      />
    </li>
    <li>
      <button
        aria-label="URLをコピーする"
        type="button"
        class="link-copy-button"
        v-on:click="onLinkCopyButtonClick"
      />
    </li>
  </ul>
</template>

<script>
import clipboard from 'clipboard-polyfill';

export default {
  name: 'SharePanel',
  props: {
    shareUrl: String,
    shareText: String,
    shareTextCn: String,
    sharePicCn: String,
  },
  data() {
    return {
      SHARE_URL: 'https://survival-jp.com',
      SHARE_TEXT: '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ',
      SHARE_TEXT_CN: 'https://survival-jp.com 「日本疫情指南」面向在日华人的日本新冠疫情信息网站——“日本疫情指南”, 查看日本新冠肺炎感染数据，还能通过地图来查找身边有没有感染病例，同时提供新冠肺炎相关新闻的更新，世界疫情发展数据。 #再见吧新冠菌 #日本疫情指南 #日本疫情',
      SHARE_PIC_CN: 'https://res.cloudinary.com/df6wesepg/image/upload/v1588696192/promotion/OGP_cn_j2ddbv.png',
    };
  },
  watch: {
    shareUrl() {
      if (this.shareUrl) {
        this.SHARE_URL = this.shareUrl;
      }
    },
    shareText() {
      if (this.shareText) {
        this.SHARE_TEXT = this.shareText;
      }
    },
    shareTextCn() {
      if (this.shareTextCn) {
        this.SHARE_TEXT_CN = this.shareTextCn;
      }
    },
    sharePicCn() {
      if (this.sharePicCn) {
        this.SHARE_PIC_CN = this.sharePicCn;
      }
    },
  },
  computed: {
    twitterShareUrl() {
      let url = this.SHARE_URL;
      if (this.shareUrl) {
        url = this.shareUrl;
      }
      let text = this.SHARE_TEXT;
      if (this.shareText) {
        text = this.shareText;
      }
      return `https://twitter.com/intent/tweet?${
        new URLSearchParams([['url', url], ['text', text]])
      }`;
    },
    facebookShareUrl() {
      let url = this.SHARE_URL;
      if (this.shareUrl) {
        url = this.shareUrl;
      }
      return `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams([['u', url]])
      }`;
    },
    weiboShareUrl() {
      let url = this.SHARE_URL;
      if (this.shareUrl) {
        url = this.shareUrl;
      }
      let text = this.SHARE_TEXT_CN;
      if (this.shareText) {
        text = this.shareTextCn;
      }
      let pic = this.SHARE_PIC_CN;
      if (this.sharePicCn) {
        pic = this.sharePicCn;
      }
      return `http://service.weibo.com/share/share.php?${
        // eslint-disable-next-line prefer-template
        new URLSearchParams([['u', url], ['title', url + ' ' + text], ['pic', pic]])
      }`;
    },
    wechatShareUrl() {
      let url = this.SHARE_URL;
      if (this.shareUrl) {
        url = this.shareUrl;
      }
      return `https://www.addtoany.com/ext/wechat/share/#${
        new URLSearchParams([['url', url]])
      }`;
    },
  },
  methods: {
    async onLinkCopyButtonClick() {
      let url = this.SHARE_URL;
      if (this.shareUrl) {
        url = this.shareUrl;
      }
      await clipboard.writeText(url);
      // eslint-disable-next-line no-alert
      alert('URLをコピーしました');
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
  .weibo-share,
  .wechat-share,
  .link-copy-button {
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

  .wechat-share {
    -webkit-mask-image: url('../assets/image/wechatlink.svg');
    mask-image: url('../assets/image/wechatlink.svg');
  }

  .link-copy-button {
    -webkit-mask-image: url('../assets/image/sharelink.svg');
    mask-image: url('../assets/image/sharelink.svg');
    border: none;
    padding: 0;
    cursor: pointer;
    appearance: none;
  }
}
</style>
