<template>
  <base-page
    :head="false"
    :loading="false"
    class="test-index"
  >
    <div class="test-index-login flex-column-center">
      <van-button
        @click="open('login')"
        type="primary"
        round
      >打开登录框</van-button>
      <br>
      <van-button
        type="success"
        round
        @click="open('player')"
      >
        视频播放器
      </van-button>
    </div>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'

import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'TextIndex',
  components: {
    [Button.name]: Button
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const open = (action: string) => {
      switch (action) {
        case 'login': {
          store.dispatch('SetStore', { account: { visible: true } })
          break
        }
        case 'player': {
          router.push('/test/play')
          break
        }
      }
    }
    return { open }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.test-index
  &-login
    padding ($font * 4)
    width 100%
    height 100%
</style>
