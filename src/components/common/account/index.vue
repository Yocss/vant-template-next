<template>
  <base-popup
    v-model:show="visible"
    :style="{ height: '100%' }"
    :duration="0.25"
    class="account-box"
  >
    <!-- <a
      href="javascript:void(0);"
      @click="closePopup"
    >关闭</a> -->
    <div class="hd flex-between-center van-hairline--bottom">
      <van-button
        round
        size="small"
        icon="cross"
        @click="closeAccount"
      />
      <h1>请登录</h1>
      <van-button
        round
        size="small"
      >
        注册
      </van-button>
    </div>
    <div class="bd"></div>
  </base-popup>
</template>
<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { Button } from 'vant'
import BasePopup from '@/components/base/BasePopup.vue'
export default defineComponent({
  name: 'ComAccount',
  props: {
    show: {
      default: false
    }
  },
  components: {
    [Button.name]: Button,
    BasePopup
  },
  setup (props, context) {
    const visible = toRef(props, 'show')
    const closeAccount = () => {
      context.emit('update:show', false)
    }
    return { visible, closeAccount }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl';
.account-box
  .hd
    position absolute
    left 0
    top 0
    padding 0 $font
    width 100%
    height $font * 3
    z-index 2
    h1
      font-size $font
      font-weight normal
  .bd
    padding $font
    padding-top $font * 4
    width 100%
    height 100%
    z-index 1
</style>
