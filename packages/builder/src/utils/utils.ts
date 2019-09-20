import { isObj, isArr } from '@uform/utils'

export const noop = () => {}

export const deepMapObj = (obj, fn, initial = {}) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = fn(value, key) || value
    if (isObj(value) && value != null) {
      if (!isArr(value)) {
        acc[key] = deepMapObj(value, fn)
      }
    }
    return acc
  }, initial)
}
