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
          <a class="newsLink" v-bind:href="news.href" target="_blank">
            <article class="article">
              <h3 class="articleTitle">
                <span>{{ news.title }}</span>
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
              <p class="articleText">{{ news.text }}</p>
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

export default {
  name: 'NewsList',
  data() {
    return {
      newsDatas: [
        {
          id: '1',
          publishAt: dayjs().subtract(1, 'minute').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
        {
          id: '2',
          publishAt: dayjs().subtract(2, 'hour').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
        {
          id: '3',
          publishAt: dayjs().subtract(3, 'day').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
        {
          id: '4',
          publishAt: dayjs().subtract(4, 'day').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
        {
          id: '5',
          publishAt: dayjs().subtract(7, 'day').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
        {
          id: '6',
          publishAt: dayjs().subtract(8, 'day').toISOString(),
          title: '東京都で５０代女性と７０代男性が新たに感染',
          text: '５０代の女性は千葉県内のクリニックに勤める看護師で、すでに３人の感染が判明している市川市のスポーツクラブを複数回利用していました。また、７０代の男性は感染判明後の先月２６日に亡くなった８０代の男性と都内の医療機関の同じ部屋に１３。',
          href: 'https://www.google.com',
        },
      ],
    };
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
<style  lang="scss" scoped>
@import "@/commons/_variables.scss";
$news-margin-bottom: 24px;
$break-point: 960px;

#NewsListBlock {
  position: relative;

  .newsList {
    max-height: 600px;
    overflow: scroll;
    list-style: none;
    text-align: left;
    padding: 0;
    margin: 0 0 0 24px;
  }

  @media (max-width: $break-point) {
    .newsList {
      max-height: 850px;
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
    font-size: 16px;
    font-weight: bold;
  }

  .time {
    font-size: 14px;
  }

  @media (max-width: $break-point) {
    .date, .time {
      font-size: 14px;
      font-weight: bold;
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

    &:hover {
      .linkArrow path {
        stroke: $color-blue;
      }

      .articleText {
        color: $color-blue;
      }
    }
  }

  .article {
    padding: 24px;
    box-shadow: $box-shadow-wrap;
    border-radius: 12px;
  }

  .articleTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
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
    font-size: 12px;
    color: $color-gray;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 8px 0 0;
    transition: color .3s ease;
  }

  @media (max-width: $break-point) {
    .articleText {
      -webkit-line-clamp: 4;
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
