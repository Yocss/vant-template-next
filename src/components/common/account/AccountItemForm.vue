<template>
  <div class="account-item-form">
    <template v-for="field in fields" :key="field">
      <van-field
        v-model="state[field]"
        v-bind="state.fieldAttrs[field].attrs"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Field } from 'vant'
import { fieldAttrs } from './data'
export default defineComponent({
  name: 'AccountItemForm',
  components: {
    [Field.name]: Field
  },
  props: {
    fields: {
      type: Array,
      default: () => { return [] }
    }
  },
  setup () {
    const state = reactive({
      fieldAttrs,
      user: '',
      code: '',
      pass: ''
    })
    return { state }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.account-item-form
  margin-bottom $font
</style>
