<template>
  <div class="layout-home">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <layout-home-nav />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LayoutHomeNav from './LayoutHomeNav.vue'
export default defineComponent({
  name: 'LayoutHome',
  components: {
    LayoutHomeNav
  }
})
</script>
<style lang="stylus">
@import '~@/assets/css/common/variables.styl'
$h = 100px
.layout-home
  position relative
  width 100%
  height 100%
  padding-bottom $h
  &-nav
    position absolute !important
    left 0
    bottom 0
    width 100%
    height $h
</style>
