/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'

export default createStore({
  // strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions: {
    SetStore ({ commit }, data: any) {
      commit('SET_STORE', data)
    },
    SetToken ({ dispatch }, token: string) {
      dispatch('SetStore', { token })
    }
  },
  modules: {
  }
})
