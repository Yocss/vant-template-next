<template>
  <div class="home">
    home
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Home',
  setup () {
    const store = useStore()
    const count = store.state
    console.log(count)
  }
})
</script>
