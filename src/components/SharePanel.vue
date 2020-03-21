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
import copy from 'copy-to-clipboard';

const SHARE_URL = 'http://covid-info.site/';
const SHARE_TEXT = ' 新型コロナウイルス感染症対策サイト';

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
  },
  methods: {
    onLinkCopyButtonClick() {
      // eslint-disable-next-line no-alert
      copy(SHARE_URL, { onCopy() { alert('URLをコピーしました'); } });
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
