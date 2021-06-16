<template>
  <base-page
    class="play-index"
    :loading="loading"
  >
    <div class="player-box">
      <axmine-player
        ref="axminePlayer"
        :src="video"
        @event="onEvent"
      />
    </div>
    <div class="play-index-btns flex-center">
      <van-button
        v-for="btn in btns"
        :key="btn.title"
        @click="toggleVideo(btn.action)"
        type="primary"
        size="small"
        round
      >
        {{ btn.title }}
      </van-button>
    </div>
    <div class="play-index-info">
      <p>1. 支持 m3u8 及 mp4 格式</p>
      <p>2. 支持在线 m3u8 直播流</p>
      <p>3. 支持 m3u8 与 mp4 随意切换</p>
      <p>4. 第一次播放时必须手动触发</p>
      <p>5. iOS 微信端及自带浏览器完全兼容</p>
      <p>6. Android 兼容微信浏览器，其他不保证</p>
      <p>7. 播放器状态通过监听 event 事件实时反馈</p>
      <p>8. 通过ref获取实例调用 invoke 方法进行控制</p>
    </div>
  </base-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Button } from 'vant'
import { EventType } from '@/common/interface'
import AxminePlayer from '@/components/common/player/index.vue'

export default defineComponent({
  name: 'TestIndex',
  components: {
    [Button.name]: Button,
    AxminePlayer
  },
  setup () {
    const loading = ref(true)
    const video = ref('/movies/av.mp4')
    const axminePlayer = ref(null)
    const btns = ref([
      // { title: '切换src', action: 'toggle' },
      { title: '播放', action: 'play' },
      { title: '暂停', action: 'pause' },
      { title: '静音', action: 'muted' }
    ])
    const toggleVideo = (action: string) => {
      const player: Record<string, Function> = axminePlayer.value || {}
      switch (action) {
        // case 'toggle': {
        //   player.invoke('src', '/test.mp4')
        //   break
        // }
        case 'play': {
          player.invoke('play')
          break
        }
        case 'pause':
          player.invoke('pause')
          break
        case 'muted': {
          const b = player.invoke('muted')
          player.invoke('muted', !b)
          break
        }
      }
    }
    const onEvent = (event: EventType) => {
      if (event.action !== 'timeupdate' && event.action !== 'progress') {
        console.log(event)
      }
    }
    onMounted(() => {
      const t = setTimeout(() => {
        loading.value = false
        clearTimeout(t)
      }, 500)
    })
    return {
      loading,
      axminePlayer,
      btns,
      video,
      onEvent,
      toggleVideo
    }
  }
})
</script>
<style lang="stylus">
.play-index
  .player-box
    width 100%
    height 420px
    background-color #000
  &-btns
    padding 50px 0
    button
      margin 0 15px
  &-info
    padding 32px
    p
      margin-bottom 16px
</style>
