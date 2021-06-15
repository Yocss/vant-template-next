<template>
  <div class="base-page-hd flex-between-center">
    <div class="side left flex align-center justify-start">
      <van-button
        round
        size="small"
        icon="arrow-left"
        @click="onClick(-1)"
      />
      <!-- <van-icon name="arrow-left" /> -->
      <!-- </van-button> -->
    </div>
    <div class="main">{{ title }}</div>
    <div class="side right flex align-center justify-end">
      <!-- 哈 -->
      <van-button
        round
        size="small"
        icon="wap-home-o"
        @click="onClick(0)"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Icon, Button } from 'vant'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'BasePageHd',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const title = computed(() => {
      return route.meta.title || ''
    })
    const onClick = (n: number) => {
      console.log(route)
      n < 0 && router.go(n)
      n === 0 && router.replace('/')
    }
    return {
      title,
      onClick
    }
  }
})
</script>
