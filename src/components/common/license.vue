<template>
  <van-dialog
    v-model:show="visible"
    :overlay="false"
    class="license-dialog"
    teleport="body"
  >
    <div class="license-box">
      <div class="license-bd">
        <div class="license-content better-scroll">
          <h1>{{ title }}</h1>
          <div class="context">
            <p
              v-for="item in 100"
              :key="item"
            >{{ context }}</p>
          </div>
        </div>
      </div>
      <div class="license-ft flex-between-center">
        <van-button
          type="default"
          round
          @click="onClick(0)"
        >不同意</van-button>
        <van-button
          type="primary"
          round
          @click="onClick(1)"
        >同意</van-button>
      </div>
    </div>
  </van-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Dialog, Button } from 'vant'

export default defineComponent({
  name: 'LicenseIndex',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component
  },
  setup (prop, { emit }) {
    const title = ref('注册及服务协议')
    const context = ref('这这是协议的具体体内容这是协议的具体内容这是协议的具体内内容这是协议的具体内容这是协议的具体内容这是协议的具体内容是协议的具体内容')
    const visible = computed(() => { return prop.show })
    const onClick = (data: boolean) => {
      emit('event', { action: 'toggleVisible', data })
    }
    return {
      title,
      context,
      visible,
      onClick
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.license-dialog
  height 100%
  top 50% !important
  width 100% !important
  background-color rgba(#000, .15) !important
  border-radius 0 !important
  .van-dialog__footer
    display none
  .van-dialog__content
    width 100%
    height 100%
    padding ($font * 1.5) ($font / 1.5)
    overflow hidden
  .license-box
    width 100%
    height 100%
    border-radius $font
    overflow hidden
    padding-bottom ($font * 4)
    background-color #fff
    box-shadow 0 0 32px 0 rgba(#000, .1)
    .license-bd
      padding $font 0 0
      width 100%
      height 100%
      overflow hidden
      .license-content
        padding 0 $font $font
        width 100%
        height 100%
        &>h1
          font-size ($font + 12)
          text-align center
          margin-bottom $font
        .context
          p
            text-indent 2em
            margin-bottom $font
            line-height 1.78
            text-align justify
            font-size $font
    .license-ft
      border-top .5px solid #eee
      height ($font * 4)
      width 100%
      padding 0 4%
      button
        width 45%
</style>
