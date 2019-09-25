import { useMemo } from 'react'
import { applyHooks, registerHooks, removeHooks, renderers } from '../shared'
import { IBuilderApi } from '../types'

const useApi = (api: Partial<IBuilderApi>): IBuilderApi => {
  const defaultApi: IBuilderApi = {
    actions: api.actions,
    renderers,
    hooks: {
      onInit: hook => {
        registerHooks('onInit', hook)
      },
      onMount: hook => {
        registerHooks('onMount', hook)
      },
      on: (name, hook) => {
        registerHooks(name, hook)
      },
      trigger: name => {
        applyHooks(name)
      },
      remove: (name, hook) => {
        removeHooks(name, hook)
      }
    }
  }
  return useMemo(
    () => ({
      ...defaultApi,
      ...api
    }),
    [defaultApi, api]
  )
}

export default useApi
