import { useMemo } from 'react'
import { noop } from '../utils'
import { renderers } from '../shared'
import { IBuilderApi } from '../types'

const useApi = (api: Partial<IBuilderApi>): IBuilderApi => {
  const defaultApi: IBuilderApi = {
    actions: api.actions,
    renderers,
    hooks: {
      onInit: noop,
      onMount: noop,
      trigger: noop
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
