import { mergeActions, createActions, createAsyncActions } from 'react-eva'
import { createFormActions, createAsyncFormActions } from '@uform/react'

export * from '@uform/react'

export * from './components'
export * from './layout'
export * from './shared'

export { default as BuilderContextProvider } from './app'

export const createBuilderActions = () =>
  mergeActions(createActions('addField'), createFormActions())

export const createBuilderAsyncActions = () =>
  mergeActions(createAsyncActions('addField'), createAsyncFormActions())
