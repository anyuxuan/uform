import { isPlainObj } from '@uform/utils'

export const noop = (...params: any[]): any => {}

export const deepMapObj = (obj, fn = noop, initial = {}) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = fn(value, key, obj) || value
    if (isPlainObj(value)) {
      deepMapObj(acc[key], fn, acc[key])
    }
    return acc
  }, initial)
}
