import { isPlainObj } from '@uform/utils'

export const noop = (...params: any[]): any => {}

export const deepMapObj = (obj, fn = noop, initial = {}) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const res = fn(value, key, obj)
    if (obj[key]) {
      acc[key] = res || obj[key]
    }
    if (isPlainObj(acc[key])) {
      deepMapObj(acc[key], fn, acc[key])
    }
    return acc
  }, initial)
}
