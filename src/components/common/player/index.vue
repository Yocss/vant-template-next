<template>
  <div
    id="axmine-player"
    :class="{ 'is-audio': audio, 'hide-controll-bar': hideControllBar }"
    class="axmine-player"
  />
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import 'video.js/dist/video-js.min.css'
import 'videojs-contrib-hls'
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'
import zh from './zh-cn'
import { isNumeric } from 'vant/lib/utils'
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
      default: true
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
    const src = computed(() => { return prop.src || prop.option.sources })
    const poster = computed(() => { return prop.poster })
    const events = ref([
      'loadstart',
      'loadedmetadata',
      // 'canplay',
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
        // data.player.on(undefined, undefined, playEvent)
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
          player.ready(() => {
            if (player.paused()) {
              if (!hideControllBar.value) {
                invoke('play')
              } else {
                !player.hasClass('vjs-has-started') && invoke('play')
              }
            } else if (timeRanges.length > 0) {
              if (!hideControllBar.value && player.hasClass('vjs-playing')) {
                // 一般情况下，单击播放页面是为了显示控制栏，So active层激活时才可以执行暂停
                player.hasClass('vjs-user-active') && invoke('pause')
              }
            }
          })
          break
        }
        case 'play': {
          // can play 的情况下开始播放
          if (timeRanges?.length > 0) {
            player.play()
          } else {
            player.ready(() => {
              player.load()
              player.on('loadedmetadata', () => {
                player.play()
              })
            })
          }
          // axminePlayerControll.value = false
          break
        }
        case 'pause':
          player.ready(() => { player.pause() })
          break
        case 'playbackRate':
          if (isNumeric(arg as (string | number))) {
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
            // player.ready(() => { return player.muted() })
          }
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
        case 'readyState':
          return player.readyState()
      }
    }
    const togglePlay = () => { invoke('togglePlay') }
    const createPlayer = () => {
      clearTimeout(timer.value)
      // 如果没有播放地址，则不创建播放器
      if (!src.value) { return false }
      // 1. 创建 video 标签
      // const className = 'axmine-player-box video-js vjs-big-play-centered'
      const className = 'axmine-player-box video-js'
      const video = videojs.dom.createEl('video', {}, { class: className })
      const pNode = document.getElementById('axmine-player')
      const ref = pNode?.appendChild(video)

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
          // 开始监听事件
          addEvent()
          // 加入自定义的控制器
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
    // 一旦监听到播放地址改变，则重启播放器
    watch(src, (v: string) => {
      if (data.player.controlBar) {
        invoke('src', v)
      } else {
        createPlayer()
      }
    })
    return { audio, hideControllBar, invoke }
  }
})
</script>
<style lang="stylus" src="./style.styl"></style>
