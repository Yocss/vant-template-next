<template>
  <div class="account-swipe-item">
    <div class="box">
      <div class="bd">
        <AccountItemForm
          :fields="data.fields"
          v-bind="$attrs"
        />
        <van-button
          block
          round
          type="primary"
          @click="onButtonClick"
        >{{ data.buttonText }}</van-button>
        <template v-if="data.key === 'login'">
          <div class="other flex-between-center">
            <a
              href="javascript:void(0);"
              @click="onClick('sms')"
            >短信登录</a>
            <a
              href="javascript:void(0);"
              @click="onClick('reset')"
            >忘记密码</a>
          </div>
        </template>
        <template v-else-if="data.key === 'sms'">
          <div class="other flex-center">
            <a
              href="javascript:void(0);"
              @click="onClick('login')"
            >返回使用帐号密码登录</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Button } from 'vant'
import { AccountType, FieldType } from './data'
import AccountItemForm from './AccountItemForm.vue'
export default defineComponent({
  name: 'AccountItem',
  components: {
    AccountItemForm,
    [Button.name]: Button
  },
  props: {
    data: {
      default: () => { return {} as AccountType }
    }
  },
  setup (prop, { emit }) {
    const onButtonClick = () => {
      const k = prop.data.key
      const form: Record<string, unknown> = {}
      prop.data.fields.forEach((item: FieldType) => {
        form[item.key] = item.value
      })
      console.log(k, form)
    }
    const onClick = (data: string) => {
      emit('event', { action: 'swipeTo', data })
    }
    return {
      onClick,
      onButtonClick
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
