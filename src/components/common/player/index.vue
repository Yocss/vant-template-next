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
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
// const zh = require('video.js/dist/lang/zh-CN.json')
export default defineComponent({
  name: 'AxminePlayer',
  props: {
    src: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (prop, { emit }) {
    const audio = ref(false)
    const data = reactive({ player: {} as VideoJsPlayer })
    const src = computed(() => { return prop.src })
    const poster = computed(() => { return prop.poster })
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
        // 当开始播放时，判断是播放音频还是视频
        if (event === 'play') {
          audio.value = (data.player.currentType()).split('/')[0] === 'audio'
        }
        data.player.on(event, playEvent)
      })
    }
    const removeEvent = () => {
      events.value.forEach(event => {
        data.player.off(event, playEvent)
      })
    }
    const reCreate = () => {
      if (data.player.controlBar) {
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
      const options: VideoJsPlayerOptions = Object.assign({
        // controlBar: {},
        // playsinline: videojs.browser.IS_IOS,
        // webkitPlaysinline: videojs.browser.IS_IOS,
        autoplay: false,
        preload: 'auto',
        controls: true,
        fluid: true,
        responsive: true,
        language: 'zh-CN',
        playbackRates: [], // play spend
        aspectRatio: '16:9'
      }, {
        sources: src.value,
        poster: poster.value
      }, prop.option as VideoJsPlayerOptions)

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
