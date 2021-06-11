<template>
  <div class="test-index">
    <div class="test-player">
      <axmine-player
        ref="axminePlayer"
        :src="video"
        @event="onEvent"
      />
    </div>
    <div class="test-player-btns">
      <van-button
        v-for="btn in btns"
        :key="btn.title"
        @click="toggleVideo(btn.action)"
      >
        {{ btn.title }}
      </van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    // const video = ref('http://boliu.jiankao.wang/live/app.m3u8?auth_key=1623389727-0-0-4f1b50e0691b78996c92d7362e474183')
    const video = ref('https://vod.jiankao.wang/2202c169cc614d6c87bc18577ce0cf3f/bef9cd89fcb348728dbd5a68477a110a-27ccfc3e8264433c1bd3c6ec23e0565a-sd.m3u8')
    const axminePlayer = ref(null)
    const btns = ref([
      { title: '切换src', action: 'toggle' },
      { title: '播放', action: 'play' },
      { title: '暂停', action: 'pause' },
      { title: '静音', action: 'muted' }
    ])
    const toggleVideo = (action: string) => {
      const player: Record<string, Function> = axminePlayer.value || {}
      switch (action) {
        case 'toggle': {
          const l1 = 'https://vod.jiankao.wang/366c82d7ef4247efae7da2104713ebaf/c8c454d968144b079cfe0d5c901f2b5e-74895cf715fd7e56ede8175efa4bfcc7-sd.mp4'
          const l2 = 'https://vod.jiankao.wang/7c01465c94e449eeb2c795909d6b5eca/84b66563011d4411b801161ac54cd95a-6a3736091d286b946486bc6e0da0fdc7-sd.mp4'
          video.value = video.value === l1 ? l2 : l1
          // video.value = 'http://boliu.jiankao.wang/live/app.m3u8?auth_key=1623389727-0-0-4f1b50e0691b78996c92d7362e474183'
          console.log('haha')
          const a = player.invoke('play')
          console.log(a)
          break
        }
        case 'play':
          player.invoke('play')
          break
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
      console.log(event)
    }
    return {
      axminePlayer,
      btns,
      video,
      onEvent,
      toggleVideo
    }
  }
})
</script>
