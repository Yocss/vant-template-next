<template>
  <base-page
    :head="false"
    :loading="false"
    class="news"
  >
    News
    <router-link to="/">回首页</router-link>
    <div>
      <a
        href="javascript:void(0);"
        @click="open"
      >打开</a>
    </div>
  </base-page>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from '@/store'
// import { onBeforeRouteLeave } from 'vue-router'
export default defineComponent({
  name: 'NewsIndex',
  components: {
  },
  setup () {
    const store = useStore()
    const state = reactive({
      show: false
    })
    // onBeforeRouteLeave((to, from, next) => {
    //   console.log('to: ')
    //   console.log(to)
    //   console.log('from: ')
    //   console.log(from)
    //   next(false)
    // })
    const open = () => { store.dispatch('SetStore', { account: { visible: true } }) }
    return { state, open }
  }
})
</script>
