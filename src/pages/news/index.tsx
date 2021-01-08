import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NewsIndex',
  setup () {
    const state = {
      a: 1
    }
    const handleClick = () => {
      state.a++
    }
    return { state, handleClick }
  },
  render () {
    return (
      <div onClick={this.handleClick}>{this.state.a}</div>
    )
  }
})
