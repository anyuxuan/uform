import * as React from 'react'
import { ISchema } from '@uform/types'
import { recursiveReactElement } from '../utils'

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

interface IConnectedProps {
  [k: string]: any
}

type IConfig = (params: any) => React.ReactElement

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
export const registerConfig = (name: string, config: IConfig): void => {
  if (!name) {
    return
  }
  CONFIG_MAP[name] = config
}

export const getConfig = (name: string): any => {
  return CONFIG_MAP[name]
}

// 为react组件传递一些属性
export const connectProps = (props?: IConnectedProps) => (
  element: React.ReactElement
) => {
  if (!React.isValidElement(element)) {
    return null
  }
  return recursiveReactElement(element, child =>
    React.cloneElement(child, {
      ...child.props,
      ...props
    })
  )
}

// 注册默认的schema属性，拖拽左侧组件后，会用注册的默认schema在预览区域生成一个Field
// name参数与注册的组件中的x-component属性对应
export const registerDefaultSchema = (name: string, schema: ISchema): void => {
  if (!name) {
    return
  }
  DEFAULT_SCHEMA[name] = schema
}

export const getDefaultSchema = (name: string): ISchema => DEFAULT_SCHEMA[name]
