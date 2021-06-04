<template>
  <van-popup
    v-model:show="visible"
    :position="position"
    safe-area-inset-bottom
    close-on-popstate
    v-bind="$attrs"
    teleport="body"
  >
    <slot />
  </van-popup>
</template>
<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { Popup } from 'vant'
export default defineComponent({
  name: 'BasePopup',
  props: {
    show: {
      require: true,
      default: false
    },
    position: {
      default: 'bottom'
    }
  },
  components: {
    [Popup.name]: Popup
  },
  setup (prop) {
    const visible = toRef(prop, 'show')
    // const showSlot = ref(false)
    return {
      visible
      // showSlot,
    }
  }
})
</script>
