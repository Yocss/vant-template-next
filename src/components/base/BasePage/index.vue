<template>
  <div class="base-page">
    <slot name="head">
      <base-page-hd />
    </slot>
    <div class="base-page-bd better-scroll">
      <slot />
    </div>
    <div
      v-show="loading"
      class="base-page-loading flex-center">
      <van-loading
        color="#1989fa"
        type="spinner"
        size="36px"
        vertical
      >
        拼命加载中
      </van-loading>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import BasePageHd from './hd.vue'
import { Loading } from 'vant'

export default defineComponent({
  name: 'BasePage',
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Loading.name]: Loading,
    BasePageHd
  }
})
</script>

<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
$hd = $font * 3
.base-page
  position relative
  width 100%
  height 100%
  padding-top $hd
  overflow hidden
  background-color #fff
  box-shadow 0 0 5px 0 rgba(#000, .1)
  &-loading
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #fff
    z-index 2
  &-hd
  &-bd
    width 100%
  &-hd
    position absolute
    left 0
    top 0
    height $hd
    padding 0 $font
    background-color #f5f5f5
    box-shadow 0 0 5px 0 rgba(#000, .2)
    z-index 3
    .side
      width $hd * 1.5
      height 100%
  &-bd
    height 100%
    z-index 1
</style>
