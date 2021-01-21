<template>
  <div class="account-swipe-item">
    <div class="box">
      <AccountItemForm
        :fields="fields"
      />
      <van-button
        block
        round
        type="primary"
      >立即登录</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { Button } from 'vant'
import { AccountItemKey } from './data'
import AccountItemForm from './AccountItemForm.vue'
export default defineComponent({
  name: 'AccountItem',
  components: {
    AccountItemForm,
    [Button.name]: Button
  },
  props: {
    fields: {
      type: Array,
      default: () => { return [] }
    },
    page: {
      type: String,
      default: AccountItemKey.LOGIN
    }
  },
  setup (props) {
    const state = reactive({})
    const buttonText = computed(() => {
      const res = {
        [AccountItemKey.LOGIN]: '立即登录',
        [AccountItemKey.JOIN]: '免费注册',
        [AccountItemKey.FIND]: '重设密码'
      }
      const k = props.page || AccountItemKey.LOGIN
      return res[k]
    })
    return { state, buttonText }
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl';
.account-swipe-item
  width 100%
  height 100%
  padding $font
  .box
    width 100%
    height auto
</style>
