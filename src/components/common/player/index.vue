<template>
  <video-js
    id="axmine-player"
    :class="{ 'is-audio': audio, 'hide-controll-bar': hideControllBar }"
    class="axmine-player"
  />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import 'video.js/dist/video-js.min.css'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import zh from './zh-cn'
export default defineComponent({
  name: 'AxminePlayer',
  props: {
    // 视频地址
    src: {
      type: String,
      default: ''
    },
    // 封面图
    poster: {
      type: String,
      default: ''
    },
    // 是否显示控制栏
    hideControll: {
      type: Boolean,
      default: false
    },
    option: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (prop, { emit }) {
    const audio = ref(false)
    const timer = ref(0)
    const tag = reactive({ div: {} as Element })
    const hideControllBar = computed(() => { return prop.hideControll })
    const data = reactive({ player: {} as VideoJsPlayer })
    const srcInvoke = ref('')
    const src = computed(() => { return prop.src || prop.option.sources })
    const poster = computed(() => { return prop.poster })
    const events = ref([
      'loadstart',
      'loadedmetadata',
      'loadeddata',
      // 'canplay',
      'stalled',
      'emptied',
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
      'useractive',
      'userinactive',
      'volumechange',
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
    const playEvent = (origin: Record<string, unknown>) => {
      doEmit(origin)
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
    const invoke = (action: string, arg?: unknown) => {
      const player = data.player
      const timeRanges: Record<string, number> = player.played()
      // player.paused()
      switch (action) {
        case 'togglePlay': {
          if (player.paused()) {
            invoke('play')
          } else {
            const bool = player.hasClass('vjs-playing') && player.hasClass('vjs-user-active')
            bool && invoke('pause')
          }
          break
        }
        case 'play': {
          // can play 的情况下开始播放
          if (timeRanges?.length > 0) {
            player.play()
          } else {
            player.ready(() => {
              // console.log('==')
              // console.log(player.currentType())
              // console.log(player.canPlayType(player.currentType()))
              // console.log('==')
              // player.load()
              // player.readyState() > 0 && player.play()
              player.play()
              // player.on('loadstart', () => {
              //   player.play()
              // })
              // player.on('loadedmetadata', () => {
              //   player.play()
              // })
            })
          }
          // axminePlayerControll.value = false
          break
        }
        case 'pause':
          player.ready(() => { player.pause() })
          break
        case 'playbackRate':
          if (arg) {
            player.playbackRate(arg as number)
          } else {
            return player.playbackRate()
          }
          break
        case 'muted':
          if (arg === true || arg === false) {
            player.ready(() => { player.muted(arg) })
          } else {
            return player.muted()
          }
          break
        case 'currentTime':
          player.ready(() => { player.currentTime(arg as number) })
          break
        case 'src':
          srcInvoke.value = arg as string
          if (arg) {
            srcInvoke.value = arg as string
          } else {
            return player.src()
          }
          break
        case 'load':
          player.ready(() => player.load())
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
        case 'readyState':
          return player.readyState()
      }
    }
    const togglePlay = () => { invoke('togglePlay') }
    const createPlayer = (option: Record<string, unknown> = { autoplay: false, sources: src.value }) => {
      clearTimeout(timer.value)
      // 如果没有播放地址，则不创建播放器
      // 1. 创建 video 标签
      // const className = 'axmine-player-box video-js vjs-big-play-centered'
      const className = 'axmine-player-box video-js'
      const video = videojs.dom.createEl('video', {}, { class: className })
      // const source = videojs.dom.createEl('source', { src: option.sources, type: 'application/x-mpegURL' })
      // video.appendChild(source)
      const pNode = document.getElementById('axmine-player')
      const ref = pNode?.appendChild(video)

      // 2. 合并选项
      const options = Object.assign({
        controlBar: {},
        playsinline: videojs.browser.IS_IOS,
        webkitPlaysinline: videojs.browser.IS_IOS,
        // autoplay: bool,
        preload: 'auto',
        controls: true,
        fluid: true,
        responsive: true,
        language: 'zh-CN',
        playbackRates: [], // play speed
        notSupportedMessage: '不受支持的视频格式',
        html5: { vhs: { withCredentials: false, overrideNative: true } },
        aspectRatio: '16:9'
      }, {
        sources: option.sources,
        poster: poster.value
      }, prop.option as VideoJsPlayerOptions, option)
      // const a: VideoJsPlayerOptions = {}

      // 3. 创建播放器
      if (ref) {
        // 将语言设置为中文
        videojs.addLanguage('zh-CN', zh)
        data.player = videojs(ref, options, function onPlayerReady () {
          // 开始监听事件
          addEvent()
          // 加入自定义的 mask 控制块(点击出现播放暂停按制按钮)
          tag.div = videojs.dom.createEl('div', {}, { class: 'axmine-player-controll' })
          data.player.$('video').after(tag.div)
          tag.div.addEventListener('click', togglePlay)
        })
      }
    }
    onMounted(() => {
      // 组件加载完成后，延时 10 毫秒启动创建播放器
      timer.value = setTimeout(() => { createPlayer() }, 10)
    })
    onUnmounted(() => {
      clearTimeout(timer.value)
      if (data.player.controlBar) {
        tag.div.removeEventListener('click', togglePlay)
        removeEvent()
        data.player.dispose()
        data.player = {} as VideoJsPlayer
      }
    })
    const doSwitch = (sources: string) => {
      if (data.player.controlBar) {
        data.player.dispose()
        data.player = {} as VideoJsPlayer
      }
      createPlayer({ autoplay: true, sources })
    }
    // 一旦监听到播放地址改变，则重启播放器
    watch(src, (v) => { doSwitch(v) })
    watch(srcInvoke, (v) => { doSwitch(v) })
    return { audio, hideControllBar, invoke }
  }
})
</script>
<style lang="stylus" src="./style.styl"></style>
