<template>
  <base-page
    :head="false"
    :loading="loading"
    loadingText="页面加载中"
    class="home-index"
  >
    <!-- 轮播图 -->
    <div class="home-index-banner">
      <div class="box">
        <com-banner :data="banners" />
      </div>
    </div>
    <!-- /轮播图 -->
  </base-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import ComBanner from '@/components/common/banner/index.vue'
export default defineComponent({
  name: 'HomeIndex',
  components: {
    ComBanner
  },
  setup () {
    const loading = ref(true)
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
    onMounted(() => {
      const t = setTimeout(() => {
        loading.value = false
        clearTimeout(t)
      }, 300)
    })
    return { loading, banners, open }
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
