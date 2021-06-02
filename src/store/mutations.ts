/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutationTree } from 'vuex'
import { State } from './state'

function getType (v: any) { return Object.prototype.toString.call(v).slice(8, -1) }
// function setStore (state: any, data: Record<string, any>) {
//   let val = data
//   console.log(data)
//   if (data.value) { val = { [data.key]: data.value } }
//   Object.keys(val).forEach((k) => {
//     if (getType(val[k]) === 'Object') {
//       Object.assign(state[k], val[k])
//     } else {
//       state[k] = val[k]
//     }
//   })
// }

export type Mutations<S = State> = {
  SET_STORE (state: S, playload: any): any;
}

const mutations: MutationTree<State> & Mutations = {
  SET_STORE: (state: any, data: Record<string, any>) => {
    if (getType(data) === 'Object') {
      // setStore(state, data)
      Object.keys(data).forEach((k) => {
        if (getType(data[k]) === 'Object') {
          Object.assign(state[k], data[k])
        } else {
          state[k] = data[k]
        }
      })
      // console.log(state.account)
    } else {
      throw new Error('data 必须是对象类型')
    }
  }
}

export { mutations }
