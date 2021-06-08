<template>
  <div class="com-banner flex-center">
    <van-empty
      v-if="data.length < 1"
      image="/empty.png"
      image-size="80"
      description="暂无相关数据"
    />
    <com-swipe
      v-if="data.length > 1"
      :data="data"
    />
    <com-swipe-item
      v-else
      :data="data[0]"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Empty } from 'vant'
import ComSwipe from './swipe.vue'
import ComSwipeItem from './item.vue'

export default defineComponent({
  name: 'ComBanner',
  components: {
    [Empty.name]: Empty,
    ComSwipe,
    ComSwipeItem
  },
  props: {
    data: {
      type: Array,
      default: () => { return [] }
    }
  }
})
</script>
<style lang="stylus">
.com-banner
  width 100%
  height 100%
  background-color #fff
</style>
