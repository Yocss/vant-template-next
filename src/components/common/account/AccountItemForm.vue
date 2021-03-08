<template>
  <div class="account-item-form">
    <template v-for="field in data.fields" :key="field">
      <van-field
        v-model="form[field]"
        size="large"
        v-bind="data.attrs"
        class="account-field"
      >
        <template
          v-if="field === 'code'"
          #button
        >
          <van-button
            disabled
            type="primary"
            round
            size="small"
          >获取验证码</van-button>
        </template>
      </van-field>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Field, Button } from 'vant'
export default defineComponent({
  name: 'AccountItemForm',
  components: {
    [Button.name]: Button,
    [Field.name]: Field
  },
  props: {
    data: {
      default: () => { return {} }
    }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
.account-item-form
  margin-bottom $font * 2
  .account-field
    padding-left $font
    padding-right $font
    line-height $font * 2
    &::after
      display none
    &::before
      content ' '
      position absolute
      box-sizing border-box
      pointer-events none
      left $font
      right $font
      bottom 0
      border 1px solid #666
      transform: scaleY(0.3)
</style>