<template>
  <van-swipe
    ref="refSwipe"
    loop
    :autoplay="3500"
    :vertical="false"
    :show-indicators="true"
    :duration="500"
    touchable
    lazy-render
    class="com-swipe"
  >
    <van-swipe-item
      v-for="item in data"
      :key="item.src"
    >
      <slot>
        <com-swipe-item :data="item" />
      </slot>
    </van-swipe-item>
  </van-swipe>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Swipe, SwipeItem } from 'vant'

import ComSwipeItem from './item.vue'
export default defineComponent({
  name: 'ComSwipe',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
        /**
         * {
         *   href: '图片指向地址',
         *   src: '图片地址',
         *   alt: '图片说明'
         * }
         */
      }
    }
  },
  components: {
    ComSwipeItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  }
})
</script>
<style lang="stylus">
.com-swipe
  width 100%
  height 100%
  &-item
    width 100%
    height 100%
</style>
