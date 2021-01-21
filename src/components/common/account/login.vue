<template>
  <div class="box">
    <van-field />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Field } from 'vant'
export default defineComponent({
  name: 'Login',
  components: {
    [Field.name]: Field
  }
})
</script>
