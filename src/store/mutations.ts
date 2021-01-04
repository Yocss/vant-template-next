/* eslint-disable @typescript-eslint/no-explicit-any */
function getType (v: any) {
  return Object.prototype.toString.call(v).slice(8, -1)
}

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

const mutations = {
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

export default mutations
