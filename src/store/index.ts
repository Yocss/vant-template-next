/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { state, State } from './state'
import mutations from './mutations'

export const key: InjectionKey<Store<State>> = Symbol('For state.state')

export const store = createStore<State>({
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

export function useStore () {
  return baseUseStore(key)
}
