<template>
  <base-popup
    v-model:show="visible"
    :style="{ height: '100%' }"
    :duration="0.25"
    class="account-box"
  >
    <!-- head -->
    <div class="hd flex-between-center">
      <van-button
        round
        size="small"
        icon="cross"
        @click="onClose"
      />
      <h1>{{ title }}</h1>
      <van-button round size="small">
        注册
      </van-button>
    </div>
    <!-- /head -->

    <!-- body -->
    <div class="bd">
      <van-swipe
        ref="refSwipe"
        :loop="false"
        :duration="300"
        :autoplay="false"
        :touchable="true"
        :show-indicators="false"
        class="account-swipe"
        @change="onChange"
      >
        <van-swipe-item
          v-for="item in state.accounts"
          :key="item.key"
        >
          <component
            :is="state.accountItem"
            :page="item.key"
            :fields="item.fields"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- /body -->
  </base-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRef } from 'vue'
import { Button, Swipe, SwipeItem } from 'vant'
import { accounts } from './data'
import BasePopup from '@/components/base/BasePopup.vue'
import AccountItem from './AccountItem.vue'
export default defineComponent({
  name: 'ComAccount',
  props: {
    show: { default: false }
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    BasePopup
  },
  setup (props, context) {
    const state = reactive({ accountItem: AccountItem, active: 0, accounts })
    // 登录框开关控制
    const visible = toRef(props, 'show')
    // 关闭登录框
    const onClose = () => { context.emit('update:show', false) }
    // 页面切换
    const onChange = (i: number) => { state.active = i }
    // 页面标题
    const title = computed(() => { return state.accounts[state.active].title })
    // 返回数据
    return {
      title,
      state,
      visible,
      onClose,
      onChange
    }
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
    box-shadow 0 0 1px 0 rgba(#000, .1)
    h1
      font-size $font
      font-weight normal
  .bd
    padding-top $font * 3
    width 100%
    height 100%
    z-index 1
    .account-swipe
      width 100%
      height 100%
</style>
