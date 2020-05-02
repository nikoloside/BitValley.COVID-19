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

const SHARE_URL = 'https://survival-jp.com';
const SHARE_TEXT = '「さよならコロナ」1分で新型コロナウイルスのリアルタイム情報をまとめて感染事例チェックマップ #感染事例チェックマップ #さよならコロナ #covid19 #新型肺炎 #新型コロナウイルス対策まとめ';
const SHARE_PIC = 'https://res.cloudinary.com/df6wesepg/image/upload/v1587817947/OGP_2.1_o1noa1.png';

export default {
  name: 'SharePanel',
  computed: {
    twitterShareUrl() {
      return `https://twitter.com/intent/tweet?${
        new URLSearchParams([['url', SHARE_URL], ['text', SHARE_TEXT]])
      }`;
    },
    facebookShareUrl() {
      return `https://www.facebook.com/sharer/sharer.php?${
        new URLSearchParams([['u', SHARE_URL]])
      }`;
    },
    weiboShareUrl() {
      return `http://service.weibo.com/share/share.php?${
        new URLSearchParams([['u', SHARE_URL], ['title', SHARE_TEXT], ['pic', SHARE_PIC]])
      }`;
    },
    wechatShareUrl() {
      return `https://www.addtoany.com/ext/wechat/share/#${
        new URLSearchParams([['url', SHARE_URL]])
      }`;
    },
  },
  methods: {
    async onLinkCopyButtonClick() {
      await clipboard.writeText(SHARE_URL);
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
