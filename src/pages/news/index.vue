<template>
  <div
    ref="refRoot"
    class="news"
  >
    News
    <router-link to="/">回首页</router-link>
    <div>
      <a
        href="javascript:void(0);"
        @click="open"
      >打开</a>
      <com-account
        v-model:show="state.show"
      />
    </div>
  </div>
</template>
<script lang="ts">
// import { defineComponent, onMounted } from 'vue'
import { defineComponent, reactive } from 'vue'
import ComAccount from '@/components/common/account/index.vue'
// import { useStore } from '@/store'
// import { onBeforeRouteLeave } from 'vue-router'
export default defineComponent({
  name: 'NewsIndex',
  components: {
    ComAccount
  },
  setup () {
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
    const open = () => { state.show = true }
    return { state, open }
  }
})
</script>
