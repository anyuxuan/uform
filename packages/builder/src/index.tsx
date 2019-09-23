import { createActions, createAsyncActions } from 'react-eva'
import { createFormActions, createAsyncFormActions } from '@uform/react'

export * from '@uform/react'

export * from './renderer'
export * from './shared'
export * from './hooks'
export * from './types'

export { default as BuilderContextProvider } from './app'

const ACTION_NAMES = [
  'addField',
  'deleteField',
  'alterField',
  'addFieldProperty',
  'clickField',
  'getCurrentFieldProps',
  'setPanelVisible',
  'dispatch'
]

// TODO: 使用mergeActions会出现actions未声明问题，不知道为什么
export const createBuilderActions = () => ({
  ...createActions(...ACTION_NAMES),
  ...createFormActions()
})

export const createAsyncBuilderActions = () => ({
  ...createAsyncActions(...ACTION_NAMES),
  ...createAsyncFormActions()
})
