<template>
  <div
    id="axmine-player"
    class="axmine-player"
  />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
import videojs, { VideoJsPlayer } from 'video.js'
// const zh = require('video.js/dist/lang/zh-CN.json')
export default defineComponent({
  name: 'AxminePlayer',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  setup (prop, { emit }) {
    const data = reactive({ player: {} as VideoJsPlayer })
    const src = computed(() => { return prop.src })
    const events = ref([
      'loadstart',
      'loadedmetadata'
    ])
    const doEmit = (data: unknown) => {
      emit('emit', data)
    }
    const playEvent = (data: unknown) => {
      doEmit(data)
    }
    const addEvent = () => {
      events.value.forEach(event => {
        // if (event === 'play') {
        //   const src = data.player.src()
        // }
        data.player.on(event, playEvent)
      })
    }
    const removeEvent = () => {
      events.value.forEach(event => {
        data.player.off(event, playEvent)
      })
    }
    const reCreate = () => {
      if (data.player.id()) {
        // 移除事件
        removeEvent()
        // 注销播放器
        data.player.dispose()
      }
    }
    const createPlayer = () => {
      // 1. 创建 video 标签
      const className = 'axmine-player-box video-js vjs-big-play-centered'
      const video = videojs.dom.createEl('video', {}, { class: className })
      const ref = document.getElementById('axmine-player')?.appendChild(video)

      // 2. 合并选项
      const options = {}

      // 3. 创建播放器
      if (ref) {
        data.player = videojs(ref, options, function onPlayerReady () {
          addEvent()
        })
      }
    }
    onMounted(() => {
      createPlayer()
    })
    // 一旦监听到播放地址改变，则重启播放器
    watch(src, () => {
      reCreate()
    })
    return { data }
  }
})
</script>
