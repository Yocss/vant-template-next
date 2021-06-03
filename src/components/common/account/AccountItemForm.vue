<template>
  <div class="account-item-form">
    <template v-for="field in fields" :key="field">
      <!-- v-model="form[field]" -->
      <van-field
        v-model.trim="field.value"
        size="large"
        v-bind="field.attrs"
        class="account-field"
      >
        <template
          v-if="field.key === 'code'"
          #button
        >
          <van-button
            :disabled="disabled"
            type="primary"
            round
            size="small"
            @click="getCode"
          >{{ codeText }}</van-button>
        </template>
      </van-field>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { Field, Button } from 'vant'
import { FieldType } from './data'
export default defineComponent({
  name: 'AccountItemForm',
  components: {
    [Button.name]: Button,
    [Field.name]: Field
  },
  props: {
    fields: {
      type: Array,
      default: () => { return [] }
    }
  },
  setup (prop, { emit }) {
    const codeText = ref('获取验证码')
    const loading = ref(false)
    const data = reactive({ timer: 0 })
    const disabled = computed(() => {
      const fields = prop.fields as Array<FieldType>
      let bool = true
      const user = fields.find(e => e.key === 'user')
      // 需要使用到 code 的地方，并且手机号存在时，如果手机号合法，则将发送验证码置为允许
      if (fields.some((e) => e.key === 'code') && user?.value) {
        const rule = user.rules.rules.find(e => e.pattern)
        if (rule) {
          const reg = rule.pattern as RegExp
          const v = user.value as string
          bool = !reg.test(v)
        }
      }
      return loading.value || bool
    })
    const setCodeText = (t: number): void => {
      clearInterval(data.timer)
      data.timer = setInterval(() => {
        t--
        if (t < 1) {
          codeText.value = '重新发送'
          clearInterval(data.timer)
          loading.value = false
        } else {
          codeText.value = '已发送 ' + (t > 9 ? t : '0' + t)
        }
      }, 1000)
    }
    watch(loading, (v) => {
      if (v) {
        codeText.value = '已发送 60'
        setCodeText(60)
      }
    })
    const getCode = () => {
      // 发送验证码之前，computed里已做过验证，是否有必要检查一下手机号是否合法?
      loading.value = true
      emit('event', { action: 'getCode' })
    }
    return { disabled, getCode, codeText }
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
