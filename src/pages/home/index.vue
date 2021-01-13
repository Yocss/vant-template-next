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
// import { defineComponent, onMounted } from 'vue'
import { defineComponent } from 'vue'
import { useStore } from '@/store'
// import axios from '@/plugins/http'
export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    console.log(store.state.layout)
    // store.dispatch('S')
    // async function getData () {
    //   const query = { region: 3600, device: 'mb', profession: 235, version: 0 }
    //   const data = await axios.post('v3/news/news_index', query)
    //   console.log(data)
    // }
    // onMounted(async () => {
    //   await getData()
    // })
    return {}
  }
})
</script>
