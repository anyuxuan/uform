import { createActions, createAsyncActions } from 'react-eva'
import { createFormActions, createAsyncFormActions } from '@uform/react'

export * from '@uform/react'

export * from './components'
export * from './layout'
export * from './shared'

export { default as BuilderContextProvider } from './app'

// TODO: 使用mergeActions会出现actions未声明问题，不知道为什么
export const createBuilderActions = () => ({
  ...createActions('addField', 'dispatch'),
  ...createFormActions()
})

export const createAsyncBuilderActions = () => ({
  ...createAsyncActions('addField', 'dispatch'),
  ...createAsyncFormActions()
})
