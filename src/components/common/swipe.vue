<template>
  <div class="com-swipe">
    <!-- 轮播图 -->
    <van-swipe
      ref="refSwipe"
      :loop="false"
      :vertical="false"
      :show-indicators="false"
      :duration="300"
      touchable
      lazy-render
      class="account-swipe"
    >
      <van-swipe-item
        v-for="item in [1,2,3]"
        :key="item"
      >
        <div>haha{{ item }}</div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Swipe, SwipeItem } from 'vant'

export default defineComponent({
  name: 'ComSwipe',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
})
</script>
<style lang="stylus">
.com-swipe
  width 100%
  height 420px
  background-color #000
</style>
