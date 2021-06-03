<template>
  <div class="account-swipe-item flex-column-between">
    <div class="box">
      <div class="hd flex-center">{{ title }}</div>
      <div class="bd">
        <AccountItemForm
          :fields="data.fields"
          v-bind="$attrs"
        />
        <van-button
          block
          round
          type="primary"
          @click="doSubmit"
        >{{ data.buttonText }}</van-button>
        <template v-if="data.key === 'login'">
          <div class="other flex-between-center">
            <a
              href="javascript:void(0);"
              @click="onClick('sms')"
            >使用短信登录</a>
            <a
              href="javascript:void(0);"
              @click="onClick('reset')"
            >忘记密码？</a>
          </div>
        </template>
        <template v-else-if="data.key === 'sms'">
          <div class="other flex-center">
            <a
              href="javascript:void(0);"
              @click="onClick('login')"
            >返回使用帐号密码登录！</a>
          </div>
        </template>
        <template v-else-if="data.key === 'join'">
          <div class="other flex-column-center">
            <div class="license flex-align-center">
              <van-checkbox
                v-model="agreeLicense"
                shape="square"
                icon-size="16px"
              >
                我已阅读并同意
              </van-checkbox>
              <router-link to="/license">《服务协议》</router-link>
              <span>的内容。</span>
            </div>
            <a
              href="javascript:void(0);"
              @click="onClick('login')"
            >已有帐号？去登录！</a>
          </div>
        </template>
        <template v-else-if="data.key === 'reset'">
          <div class="other flex-center">
            <a
              href="javascript:void(0);"
              @click="onClick('login')"
            >已想起密码，返回登录！</a>
            <!-- <a
              href="javascript:void(0);"
              @click="onClick('login')"
            >短信登录</a> -->
          </div>
        </template>
      </div>
    </div>
    <!-- 扩展信息 -->
    <div class="box">
      <!-- 帐号或短信登录时，底部显示第三方登录 -->
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Button, Checkbox } from 'vant'
import { AccountType, FieldType } from './data'
import AccountItemForm from './AccountItemForm.vue'
export default defineComponent({
  name: 'AccountItem',
  components: {
    AccountItemForm,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button
  },
  props: {
    data: {
      default: () => { return {} as AccountType }
    }
  },
  setup (prop, { emit }) {
    const agreeLicense = ref(false)
    const doSubmit = () => {
      const k = prop.data.key
      const form: Record<string, unknown> = {}
      prop.data.fields.forEach((item: FieldType) => {
        form[item.key] = item.value
      })
      console.log(k, form)
    }
    const title = computed(() => { return prop.data.title })
    const onClick = (data: string) => {
      emit('event', { action: 'swipeTo', data })
    }
    return {
      agreeLicense,
      title,
      onClick,
      doSubmit
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
    .hd
      font-size ($font + 16)
    .bd
      .other
        padding 0 $font
        margin-top $font
        font-size $font - 4
        .license
          margin-bottom $font
          // color #666
          a
            color $primary
</style>
