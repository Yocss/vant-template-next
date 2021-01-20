import { ComponentOptionsMixin } from 'vue'
const globalMixin: ComponentOptionsMixin = {
  beforeRouteEnter: (to, from) => {
    console.log('shhhhhhhhhhhhhh')
    console.log(from)
    console.log(to)
    console.log('ehhhhhhhhhhhhhh')
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('fkkkk')
    console.log(to)
    console.log(from)
    next(false)
  }
}
export default globalMixin
