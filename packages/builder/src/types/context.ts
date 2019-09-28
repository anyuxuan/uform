import { IBuilderApi, IExtendedSchema } from './core'

export interface IBuilderContext {
  effects: any
  schema: IExtendedSchema
  global: any
  api: IBuilderApi
}
