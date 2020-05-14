<template>
  <div id="NewsListBlock">
    <ul class="newsList">
      <li
        class="newsItem"
        v-for="(news) in newsDatas"
        v-bind:key="news.id"
      >
        <time
          class="datetimeWrapper"
          v-bind:datetime="getISOString(news.publishAt)"
        >
          <span class="date">{{ getDateLabel(news.publishAt) }}</span>
          <span class="time">{{ getRelativeTimeLabel(news.publishAt) }}</span>
        </time>

        <div class="articleWrapper">
          <a
          v-bind:href="news.href"
          class="newsLink"
          >
            <article class="article">
              <h3 class="articleTitle">
                <span>{{ isLangJapanese ? news.titleja : news.titlecn }}</span>
                <svg class="linkArrow" width="7" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1.333L5.667 6 1 10.667"
                    stroke="#828E9F"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </h3>
              <p class="articleText">{{ isLangJapanese ? news.textja : news.textcn }}</p>
            </article>
          </a>
        </div>
      </li>
    </ul>

    <div class="bottomGradient" />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import axios from 'axios';

export default {
  name: 'NewsList',
  data() {
    return {
      newsDatas: [],
      newsCount: this.$route.name === 'news' ? 99999 : 5,
    };
  },
  mounted() {
    const dataList = [];

    axios.get('https://x5f9uvu468.execute-api.ap-northeast-1.amazonaws.com/default/getNews')
      .then((response) => {
        if (response.data.length > 1 &&
        response.data[0].uid < response.data[response.data.length - 1].uid) {
          response.data.reverse();
        }
        this.newsCount = Math.min(this.newsCount, response.data.length);
        // 5個のパターンと無限個のパターンあり
        let count = -1;
        response.data.forEach((news) => {
          count += 1;
          if (count >= this.newsCount) {
            return;
          }

          const data = {
            id: news.uid,
            publishAt: news.updatedTime,
            titleja: news.titleja,
            titlecn: news.titlecn,
            textja: news.descriptionja,
            textcn: news.descriptioncn,
            href: news.link,
          };
          dataList.push(data);
        });
      });
    this.newsDatas = dataList;
  },
  computed: {
    isLangJapanese() {
      return this.$i18n.locale === 'ja';
    },
  },
  methods: {
    getISOString(publishAt) {
      return dayjs(publishAt).toISOString();
    },
    getDateLabel(publishAt) {
      return dayjs(publishAt).format('YYYY.MM.DD');
    },
    getRelativeTimeLabel(publishAt) {
      // 仕様: https://bitvalley-covid19.slack.com/archives/CUX33BSTE/p1584065278005100
      const now = dayjs();

      const minuteDiff = now.diff(publishAt, 'minute');
      if (minuteDiff < 60) {
        return `${minuteDiff}分前`;
      }

      const hourDiff = now.diff(publishAt, 'hour');
      if (hourDiff < 24) {
        return `${hourDiff}時間前`;
      }

      const dayDiff = now.diff(publishAt, 'day');
      if (dayDiff <= 7) {
        return `${dayDiff}日前`;
      }

      return null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
$news-margin-bottom: 24px;
$break-point: 960px;

#NewsListBlock {
  position: relative;
  margin-top: 24px;

  .newsList {
    max-height: 850px;
    overflow: scroll;
    // max-height: 999999px;

    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 0 24px;
  }

  @media (max-width: $break-point) {
    .newsList {
      max-height: 1000px;
      // max-height: 999999px;
    }
  }

  @media (max-width: $breakpoint-sp) {
    .newsList {
      max-height: 3500px;
      // max-height: 999999px;
      height: auto;
    }
  }

  .newsItem {
    display: flex;
    margin: 24px 24px 24px 0;

    &:last-child {
      margin-bottom: 80px;
    }
  }

  @media (max-width: $break-point) {
    .newsItem {
      display: block;
      margin-top: 0;
    }
  }

  .datetimeWrapper {
    display: flex;
    flex-direction: column;
    flex: none;
    color: $color-gray;
    margin: 4px 0 0;
  }

  @media (max-width: $break-point) {
    .datetimeWrapper {
      align-items: center;
      flex-direction: row;
      margin: 0 0 8px 32px;
    }
  }

  .date {
    @include noto-font-001em(16px, bold);
  }

  .time {
    @include noto-font-001em(16px, normal);
  }

  @media (max-width: $break-point) {
    .date, .time {
      @include noto-font-001em(14px, bold);
    }

    .time {
      margin-left: 8px;
    }
  }

  .articleWrapper {
    position: relative;
    margin-left: 74px;

    &::before {
      content: '';
      position: absolute;
      left: -38px;
      width: 2px;
      top: 0;
      bottom: -$news-margin-bottom;
      background-color: $color-lightgray;
    }

    &::after {
      content: '';
      position: absolute;
      left: -42px;
      width: 10px;
      height: 10px;
      top: 8px;
      background-color: $color-lightgray;
      border-radius: 50%;
    }
  }

  @media (max-width: $break-point) {
    .articleWrapper {
      margin-left: 32px;

      &::before {
        top: -30px;
        left: -22px;
      }

      &::after {
        top: -23px;
        left: -26px;
      }
    }
  }

  .newsItem:first-child .articleWrapper {
    &::before {
      top: 12px;
    }

    &::after {
      left: -44px;
      width: 14px;
      height: 14px;
      background: linear-gradient(93.94deg, #1F72FF 0%, #0553E7 100%);
      box-shadow: 0px 4px 10px rgba(4, 82, 230, 0.24)
    }
  }

  @media (max-width: $break-point) {
    .newsItem:first-child .articleWrapper {
      &::before {
        top: -17px;
      }

      &::after {
        left: -27px;
        width: 12px;
        height: 12px;
      }
    }
  }

  .newsLink {
    display: block;
    cursor: pointer;

    &:hover {
      .linkArrow path {
        stroke: $color-blue;
      }
    }
  }

  .article {
    padding: 24px;
    box-shadow: $box-shadow-wrap;
    border-radius: 12px;
  }

  .articleTitle {
    @include noto-font-001em(16px, bold);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .linkArrow {
    margin-left: 24px;
    flex: none;

    & > path {
      transition: stroke .3s ease;
    }
  }

  .articleText {
    @include noto-font-001em(12px, normal);
    color: $color-gray;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 8px 0 0;
    transition: color .3s ease;
  }

  @media (max-width: $break-point) {
    .articleText {
      -webkit-line-clamp: 10;
    }
  }

  .bottomGradient {
    position: absolute;
    width: 100%;
    height: 110px;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
  }
}
</style>
