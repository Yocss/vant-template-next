<template>
  <div class="hello">
    {{ state.user }}
    {{ state.pass }}
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup () {
    const state = reactive({
      user: 'user',
      pass: 'pass'
    })

    return { state }
  }
})
</script>
