<template>
  <div class="account-swipe-item">
    <div class="box">
      <div class="bd">
        <AccountItemForm
          :data="data"
          v-bind="$attrs"
        />
        <van-button
          block
          round
          type="primary"
          @click="onButtonClick"
        >{{ data.buttonText }}</van-button>
        <template v-if="page === 'login'">
          <div class="other flex-between-center">
            <a href="javascript:void(0);">短信登录</a>
            <a href="javascript:void(0);">忘记密码</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
import AccountItemForm from './AccountItemForm.vue'
export default defineComponent({
  name: 'AccountItem',
  components: {
    AccountItemForm,
    [Button.name]: Button
  },
  props: {
    data: {
      default: () => { return {} }
    }
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
    .bd
      .other
        padding 0 $font
        margin-top $font
        font-size $font - 4
</style>
