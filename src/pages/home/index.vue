<template>
  <div
    ref="refRoot"
    class="home-index"
  >
    home
    <router-link to="/news">去新闻页</router-link>
    <p>
      <a
        href="javascript:void(0);"
        @click="open"
      >打开</a>
    </p>
    <com-account
      v-model:show="state.show"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ComAccount from '@/components/common/account/index.vue'
// import { useStore } from '@/store'
// import { useRoute, useRouter } from 'vue-router'
// import axios from '@/plugins/http'
export default defineComponent({
  name: 'HomeIndex',
  components: {
    ComAccount
  },
  setup () {
    const state = reactive({
      show: false
    })
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
    const open = () => { state.show = true }
    return { state, open }
  }
})
</script>
<style lang="stylus">
.home-index
  width 100%
  height 100%
</style>
