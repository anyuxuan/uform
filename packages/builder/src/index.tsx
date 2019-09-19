import { createActions, createAsyncActions } from 'react-eva'
import { createFormActions, createAsyncFormActions } from '@uform/react'

export * from '@uform/react'

export * from './renderer'
export * from './shared'
export * from './hooks'
export * from './types'

export { default as BuilderContextProvider } from './app'

// TODO: 使用mergeActions会出现actions未声明问题，不知道为什么
export const createBuilderActions = () => ({
  ...createActions(
    'addField',
    'deleteField',
    'alterField',
    'addFieldProperty',
    'clickField',
    'dispatch'
  ),
  ...createFormActions()
})

export const createAsyncBuilderActions = () => ({
  ...createAsyncActions(
    'addField',
    'deleteField',
    'alterField',
    'addFieldProperty',
    'clickField',
    'dispatch'
  ),
  ...createAsyncFormActions()
})
