<template>
  <div class="layout-home-nav">
    <van-tabbar v-model="routePath">
      <van-tabbar-item
        v-for="item in navs"
        :key="item.title"
        :name="item.url"
        :to="item.url"
        :icon="item.icon"
        :dot="false"
        replace
      >{{ item.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

import { Tabbar, TabbarItem } from 'vant'

export default defineComponent({
  name: 'LayoutHomeNav',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const navs = computed(() => { return store.state.homeNav })
    const routePath = computed(() => { return route.path })
    return {
      navs,
      routePath
    }
  }
})
</script>
