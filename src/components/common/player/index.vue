<template>
  <div
    id="axmine-player"
    :class="'axmine-player ' + audio ? 'is-audio' : ''"
  />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import zh from './zh-cn'
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
    const timer = ref(0)
    const data = reactive({ player: {} as VideoJsPlayer })
    const src = computed(() => { return prop.src || prop.option.sources })
    const poster = computed(() => { return prop.poster })
    const events = ref([
      'loadstart',
      'loadedmetadata',
      'canplay',
      'firstplay',
      'playing',
      'play',
      'pause',
      'seeking',
      'waiting',
      'seeked',
      'timeupdate',
      'progress',
      'ended',
      'fullscreenchange',
      'mediachange',
      'error'
    ])
    const doEmit = (origin: Record<string, unknown>) => {
      const action = origin.type
      emit('event', {
        action,
        data: {
          currentTime: data.player.currentTime() || 0,
          duration: data.player.duration() || 0,
          origin
        }
      })
    }
    const playEvent = (data: Record<string, unknown>) => {
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
    const createPlayer = () => {
      clearTimeout(timer.value)
      // 如果没有播放地址，则不创建播放器
      if (!src.value) { return false }
      // 1. 创建 video 标签
      const className = 'axmine-player-box video-js vjs-big-play-centered'
      const video = videojs.dom.createEl('video', {}, { class: className })
      const ref = document.getElementById('axmine-player')?.appendChild(video)

      // 2. 合并选项
      const options = Object.assign({
        controlBar: {},
        playsinline: videojs.browser.IS_IOS,
        webkitPlaysinline: videojs.browser.IS_IOS,
        autoplay: false,
        preload: 'auto',
        controls: true,
        fluid: true,
        responsive: true,
        language: 'zh-CN',
        playbackRates: [], // play speed
        aspectRatio: '16:9'
      }, {
        sources: src.value,
        poster: poster.value
      }, prop.option as VideoJsPlayerOptions)

      // 3. 创建播放器
      if (ref) {
        // 将语言设置为中文
        videojs.addLanguage('zh-CN', zh)
        data.player = videojs(ref, options, function onPlayerReady () {
          addEvent()
        })
      }
    }
    const invoke = (action: string, arg?: unknown) => {
      const player = data.player
      switch (action) {
        case 'play':
          // can play 的情况下开始播放
          player.ready(() => {
            player.on('canplay', () => {
              player.play()
            })
          })
          break
        case 'pause':
          player.ready(() => { player.pause() })
          break
        case 'muted':
          player.ready(() => { player.muted(Boolean(arg)) })
          break
        case 'currentTime':
          player.ready(() => { player.currentTime(arg as number) })
          break
        case 'src':
          player.ready(() => { player.src(arg as string) })
          break
        case 'poster':
          player.ready(() => { player.poster(arg as string) })
          break
        case 'volume':
          player.ready(() => { player.volume(arg as number) })
          break
        case 'speed':
          player.ready(() => { player.playbackRate(arg as number) })
          break
      }
    }
    onMounted(() => {
      // 组件加载完成后，延时 20 毫秒启动创建播放器
      timer.value = setTimeout(() => { createPlayer() }, 20)
    })
    onUnmounted(() => {
      clearTimeout(timer.value)
      if (data.player.controlBar) {
        removeEvent()
        data.player.dispose()
        data.player = {} as VideoJsPlayer
      }
    })
    // 一旦监听到播放地址改变，则重启播放器
    watch(src, (v: string) => {
      if (data.player.controlBar) {
        invoke('src', v)
      } else {
        createPlayer()
      }
    })
    return { audio, invoke }
  }
})
</script>
<style lang="stylus" src="./style.styl"></style>
