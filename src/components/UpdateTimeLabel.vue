<template>
  <span>
    <time
      v-bind:datetime="getDateTimeAttr(updateTime)"
    >
      {{ getDateLabel(updateTime) }}時点
    </time>
  </span>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'UpdateTimeLabel',
  props: {
    updateTime: Date,
  },
  methods: {
    getDateTimeAttr(time) {
      return dayjs(time).toISOString();
    },
    getDateLabel(time) {
      return dayjs(time).format('MM月DD日 HH:mm');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/commons/_variables.scss";
</style>
