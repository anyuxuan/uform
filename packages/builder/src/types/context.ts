import { IBuilderApi } from './core'
import { ISchema } from '@uform/types'

export interface IBuilderContext {
  effects: any
  schema: ISchema
  global: any
  api: IBuilderApi
}
