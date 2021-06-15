<template>
  <base-page
    class="test-index"
    :loading="loading"
  >
    <div>
      <router-link to="/test/play">播放器</router-link>
    </div>
  </base-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import BasePage from '@/components/base/BasePage/index.vue'

export default defineComponent({
  name: 'TextIndex',
  components: {
    BasePage
  },
  setup () {
    const loading = ref(true)
    onMounted(() => {
      // loading.value = false
      setTimeout(() => {
        loading.value = false
      }, 500)
    })
    return { loading }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
test-index
  padding $font
</style>
