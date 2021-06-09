<template>
  <div
    ref="refRoot"
    class="home-index"
  >
    <div class="home-index-player">
      <axmine-player
        ref="axminePlayer"
        @event="onEvent"
        :src="video"
      />
    </div>
    <!-- 轮播图 -->
    <div class="home-index-banner">
      <div class="box">
        <com-banner :data="banners" />
      </div>
    </div>
    <!-- /轮播图 -->

    <router-link to="/news">去新闻页</router-link>
    <div
      style="padding: 32px;"
      @click="toggleVideo"
    >切换视频源</div>
    <p>
      <a
        href="javascript:void(0);"
        @click="open"
      >打开</a>
    </p>
    <!-- <com-account /> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store'
import ComBanner from '@/components/common/banner/index.vue'
import AxminePlayer from '@/components/common/player/index.vue'
// import { useRoute, useRouter } from 'vue-router'
// import axios from '@/plugins/http'
export default defineComponent({
  name: 'HomeIndex',
  components: {
    AxminePlayer,
    ComBanner
    // ComAccount
  },
  setup () {
    const video = ref('https://vod.jiankao.wang/7c01465c94e449eeb2c795909d6b5eca/84b66563011d4411b801161ac54cd95a-6a3736091d286b946486bc6e0da0fdc7-sd.mp4')
    const axminePlayer = ref(null)
    const banners = reactive([
      {
        src: '/b1.jpg',
        alt: '测试哈',
        href: '/news'
      },
      {
        src: '/b2.jpg',
        alt: 'asdlkfsjdlf',
        href: '/about'
      }
    ])
    // const router = useRouter()
    // const route = useRoute()
    // const redirect = route.params.redirect || ''
    // if (redirect) {
    //   setTimeout(() => {
    //     typeof redirect === 'string' && router.push(redirect)
    //   }, 2000)
    // }
    // async function getData () {
    //   const query = { region: 3600, device: 'mb', profession: 235, version: 0 }
    //   const data = await axios.post('v3/news/news_index', query)
    //   console.log(data)
    // }
    // onBeforeMount(() => {
    //   const router = useRouter()
    //   const route = useRoute()
    //   const redirect = route.params.redirect || ''
    //   if (redirect) {
    //     typeof redirect === 'string' && router.push(redirect)
    //   }
    // })
    // onMounted(async () => {
    //   await getData()
    // })
    const store = useStore()
    const open = () => {
      store.dispatch('SetStore', { account: { visible: true } })
    }
    const toggleVideo = () => {
      const temp = 'https://vod.jiankao.wang/366c82d7ef4247efae7da2104713ebaf/c8c454d968144b079cfe0d5c901f2b5e-74895cf715fd7e56ede8175efa4bfcc7-sd.mp4'
      const temp2 = 'https://vod.jiankao.wang/7c01465c94e449eeb2c795909d6b5eca/84b66563011d4411b801161ac54cd95a-6a3736091d286b946486bc6e0da0fdc7-sd.mp4'
      // const temp = video.value
      video.value = video.value === temp ? temp2 : temp
      const player: Record<string, Function> = axminePlayer.value || {}
      if (player) { player.invoke('play') }
    }
    const onEvent = (e: unknown) => {
      console.log(e)
    }
    return { banners, video, open, toggleVideo, axminePlayer, onEvent }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.home-index
  width 100%
  height 100%
  &-player
    width 100%
    height 420px
    background-color #f8f8f8
  &-banner
    width 100%
    height 360px
    // padding $font
    .box
      width 100%
      height 100%
      overflow hidden
</style>
