/* eslint-disable @typescript-eslint/no-explicit-any */
import { InjectionKey } from 'vue'
import { createStore, useStore as baseStore, Store, ActionTree } from 'vuex'
import { state, State } from './state'
import { mutations } from './mutations'
export const key: InjectionKey<Store<State>> = Symbol('For state.state')

const actions: ActionTree<State, State> = {
  SetStore (context, data: any) {
    context.commit('SET_STORE', data)
  },
  SetToken ({ dispatch }, token: string) {
    dispatch('SetStore', { token })
  }
}
export const store = createStore<State>({ state, mutations, actions, modules: {} })
export function useStore () { return baseStore(key) }
