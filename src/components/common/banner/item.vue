<template>
  <div class="com-swipe-item flex-center">
    <router-link
      v-if="data.href"
      :to="data.href"
      class="flex-center"
    >
      <img v-lazy="data.src" :alt="data.alt || 'banner'">
    </router-link>
    <img
      v-else
      v-lazy="data.src"
      :alt="data.alt || 'banner'"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ComSwipeItem',
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
})
</script>
<style lang="stylus">
.com-swipe-item
  width 100%
  height 100%
  a
  img[lazy=loaded]
    width 100%
    height 100%
  img[lazy=loading]
    width 72px
    height 72px
  img[lazy=error]
    width auto
    height 70%
</style>
