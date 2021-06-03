<template>
  <base-popup
    :show="visible"
    :style="{ height: '100%' }"
    :duration="0.25"
    class="account-box"
    @closed="onClosed"
  >
    <!-- head -->
    <div class="hd flex-between-center">
      <van-button
        round
        size="small"
        :icon="active < 1 ? 'cross' : 'arrow-left'"
        @click="onClick('l')"
      />
      <van-button
        v-show="active < 1"
        round
        size="small"
        @click="onClick('r')"
      >注册</van-button>
    </div>
    <!-- /head -->

    <!-- body -->
    <div class="bd">
      <van-swipe
        ref="refSwipe"
        :loop="false"
        :vertical="false"
        :show-indicators="false"
        :duration="300"
        :touchable="isDev"
        lazy-render
        class="account-swipe"
        @change="onChange"
      >
        <van-swipe-item
          v-for="item in state.accounts"
          :key="item.key"
        >
          <account-item
            :data="item"
            @event="onEvent"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- /body -->
  </base-popup>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { Button, Swipe, SwipeItem, SwipeToOptions } from 'vant'
import { EventType } from '@/common/interface'
import { useStore } from '@/store'
import BasePopup from '@/components/base/BasePopup.vue'
import AccountItem from './AccountItem.vue'
import { accounts } from './data'
export default defineComponent({
  name: 'ComAccount',
  components: {
    AccountItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Button.name]: Button,
    BasePopup
  },
  setup () {
    const isDev = process.env.NODE_ENV === 'development'
    const state = reactive({ accounts })
    const active = ref(0)
    const store = useStore()
    const refSwipe = ref(null)

    // 登录框开关控制
    const visible = computed(() => { return store.state.account.visible })
    // 登录框已关闭
    const onClosed = () => { console.log('closed') }

    const swipeTo = (n: number) => {
      const component = refSwipe.value || {
        swipeTo: (n: number, o: SwipeToOptions = { immediate: false }) => {
          throw new Error(`组件错误, (${n}), ${o}`)
        }
      }
      component.swipeTo(n, { immediate: false })
    }

    // 关闭登录框
    const onClick = (direction: string) => {
      switch (direction) {
        case 'l':
          active.value > 0 ? swipeTo(0) : store.dispatch('SetStore', {
            account: { visible: false }
          })
          break
        case 'r':
          // console.log('点击了顶部右侧按钮')
          swipeTo(2)
          break
      }
    }

    // 页面切换
    const onChange = (i: number) => { active.value = i }

    // 监听子组件传回的数据
    const onEvent = (event: EventType) => {
      const action = event.action
      switch (action) {
        case 'swipeTo': {
          const to = event.data as string || ''
          const i = state.accounts.findIndex(e => e.key === to)
          swipeTo(i)
          break
        }
        case 'getCode': {
          // 要检查一下手机号是否合法
          break
        }
      }
    }

    // 返回数据
    return {
      isDev,
      active,
      refSwipe,
      state,
      visible,
      onClick,
      onClosed,
      onChange,
      onEvent
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl';
.account-box
  &>.hd
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
  &>.bd
    padding-top $font * 3
    width 100%
    height 100%
    z-index 1
    .account-swipe
      width 100%
      height 100%
</style>
