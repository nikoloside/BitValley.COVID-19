<template>
  <span>
    <time
      v-bind:datetime="getDateTimeAttr(updateAt)"
    >
      {{ getDateLabel(updateAt) }}
    </time>
    <span class="relative-time">
      {{ getRelativeTimeLabel(updateAt) }}更新
    </span>
  </span>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'UpdateAtLabel',
  props: {
    updateAt: Date,
  },
  methods: {
    getDateTimeAttr(time) {
      return dayjs(time).toISOString();
    },
    getDateLabel(time) {
      return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss');
    },
    getRelativeTimeLabel(time) {
      // 仕様: https://bitvalley-covid19.slack.com/archives/CUX33BSTE/p1584065278005100
      const now = dayjs();

      const minuteDiff = now.diff(time, 'minute');
      if (minuteDiff < 60) {
        return `${minuteDiff}分前`;
      }

      const hourDiff = now.diff(time, 'hour');
      if (hourDiff < 24) {
        return `${hourDiff}時間前`;
      }

      const dayDiff = now.diff(time, 'day');
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

.relative-time {
  margin-left: 8px;
}
</style>
