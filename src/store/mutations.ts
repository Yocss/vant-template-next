/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationTree } from 'vuex'
import { State } from './state'

function getType (v: any) { return Object.prototype.toString.call(v).slice(8, -1) }
function setStore (state: any, data: any) {
  let val = data
  if (data.value) { val = { [data.key]: data.value } }
  Object.keys(val).forEach((k) => {
    if (getType(val[k]) === 'Object') {
      Object.assign(state[k], val[k])
    } else {
      state[k] = val[k]
    }
  })
}

export type Mutations<S = State> = {
  SET_STORE (state: S, playload: any): any;
}

const mutations: MutationTree<State> & Mutations = {
  SET_STORE: (state: any, data: any) => {
    const type = getType(data)
    switch (type) {
      case 'Array': {
        data.forEach((val: any) => {
          setStore(state, val)
        })
        break
      }
      case 'Object': {
        setStore(state, data)
        break
      }
    }
  }
}

export { mutations }
