import { ISchema } from '@uform/types'

interface IComponentData {
  label: string
  icon: string
  type: string
  ['x-component']: string
}

interface IComponentMap {
  [k: string]: IComponentData
}

interface IDefaultSchema {
  [k: string]: ISchema
}

const FIELDS_MAP: IComponentMap = {}
const CONFIG_MAP = {}
const DEFAULT_SCHEMA: IDefaultSchema = {}

// 注册组件，注册过的组件会展示在组件面板中
export const registerComponent = (name: string, data: IComponentData): void => {
  if (!name) {
    return
  }
  FIELDS_MAP[name] = data
}

export const getComponent = (name: string): IComponentData | undefined => {
  return FIELDS_MAP[name]
}

export const getComponents = (): IComponentMap => FIELDS_MAP

// 注册组件的配置项
// TODO: 确定配置项参数
export const registerConfig = (name: string, config: any): void => {
  if (!name) {
    return
  }
  CONFIG_MAP[name] = config
}

export const getConfig = (name: string): any => {
  return CONFIG_MAP[name]
}

// 注册默认的schema属性，拖拽左侧组件后，会用该默认schema生成一个Field
// name参数与注册的组件中的x-component属性对应
export const registerDefaultSchema = (name: string, schema: ISchema): void => {
  if (!name) return
  DEFAULT_SCHEMA[name] = schema
}

export const getDetaulSchema = (name: string): ISchema => DEFAULT_SCHEMA[name]
