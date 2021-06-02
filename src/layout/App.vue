<template>
  <component :is="layout" />
  <com-account />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import LayoutDefault from './LayoutDefault.vue'
import LayoutHome from './LayoutHome.vue'
import LayoutNull from './LayoutNull.vue'
import ComAccount from '@/components/common/account/index.vue'
export default defineComponent({
  name: 'App',
  components: {
    ComAccount
  },
  setup () {
    const store = useStore()
    // 计算当前路由应当使用的布局
    const layout = computed(() => {
      const params = {
        default: LayoutDefault,
        home: LayoutHome,
        null: LayoutNull
      }
      const k = store.state.layout || 'default'
      return params[k]
    })
    return { layout }
  }
})
</script>>
