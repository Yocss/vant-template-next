<template>
  <div
    ref="refRoot"
    class="home-index"
  >
    <!-- 轮播图 -->
    <div class="home-index-banner">
      <div class="box">
        <com-banner :data="banners" />
      </div>
    </div>
    <!-- /轮播图 -->

    <router-link to="/news">去新闻页</router-link>
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
import { defineComponent, reactive } from 'vue'
import { useStore } from '@/store'
import ComBanner from '@/components/common/banner/index.vue'
// import { useRoute, useRouter } from 'vue-router'
// import axios from '@/plugins/http'
export default defineComponent({
  name: 'HomeIndex',
  components: {
    ComBanner
    // ComAccount
  },
  setup () {
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
    return { banners, open }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.home-index
  width 100%
  height 100%
  &-banner
    width 100%
    height 360px
    // padding $font
    .box
      width 100%
      height 100%
      overflow hidden
</style>
