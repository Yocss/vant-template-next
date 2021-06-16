<template>
  <div
    :class="{'has-head': head}"
    class="base-page"
  >
    <slot name="head">
      <base-page-hd v-if="head" />
    </slot>
    <div
      v-if="!loading"
      class="base-page-bd better-scroll"
    >
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
        {{ loadingText }}
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
    head: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: '拼命加载中'
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
  padding-top 0
  overflow hidden
  background-color #fff
  // box-shadow 0 0 5px 0 rgba(#000, .1)
  &.has-head
    padding-top $hd
    .base-page-hd
      display flex
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
    display none
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
