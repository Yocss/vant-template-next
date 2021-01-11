<template>
  <div
    ref="refRoot"
    class="home"
  >
    home
    <router-link to="/news">去新闻页</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
// import { useStore } from 'vuex'
import axios from '@/plugins/http'
export default defineComponent({
  name: 'Home',
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function getData (): Promise<any> {
      const data = await axios.post('https://lm.sihongapi.top/v3/news/news_index', {
      // const data = await axios.get('/dy/article/FVLRS2F60521QBNK.html?clickfrom=w_yw', {
      // const data = await axios.post('https://llm.sihongapi.top/v3/news/news_index', {
      // const data = await axios.post('https://www.jzlm360.com/', {
        region: 360000,
        device: 'mb',
        profession: 235,
        version: 0,
        page: 1
      })
      console.log(data)
    }
    // const store = useStore()
    onMounted(async () => {
      await getData()
      // console.log('=====')
      // console.log(store.state.token)
      // console.log('=====')
    })
    return {}
  }
})
</script>
