<template>
  <div
    :class="{ animate: animate }"
    class="layout-default"
  >
    <router-view
      @animationend.enter="onAnimated"
      v-slot="{ Component }"
    >
      <transition :name="animate" type="animation">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'LayoutDefault',
  setup () {
    const store = useStore()
    const animate = computed(() => {
      return store.state.transition
    })
    const onAnimated = () => {
      store.dispatch('SetStore', { transition: '' })
    }
    return { animate, onAnimated }
  }
})
</script>
<style lang="stylus">
.layout-default
  position relative
  width 100%
  height 100%
  &.animate
    overflow hidden
</style>
