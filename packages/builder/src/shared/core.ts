import React, { isValidElement, cloneElement } from 'react'
import { ISchema } from '@uform/types'
import { isFn, isEmpty, isArr, isObj } from '@uform/utils'
import { recursiveReactElement } from '../utils'
import {
  IComponentMap,
  IComponentData,
  IConfigMap,
  IConfig,
  IDefaultSchema,
  IPlugin,
  IConnectedProps,
  IBuilderApi
} from '../types'

const COMPONENTS_MAP: IComponentMap = {}

const CONFIG_MAP: IConfigMap = {}

const DEFAULT_SCHEMA: IDefaultSchema = {}

const PLUGINS: IPlugin[] = []

// 注册组件的配置项
export const registerConfig = (name: string, config: IConfig) => {
  if (!name) {
    return
  }
  CONFIG_MAP[name] = config
}

export const getConfig = (name: string) => CONFIG_MAP[name]

// 为react组件传递一些属性
export const connectProps = (props?: IConnectedProps) => (
  element: React.ReactElement
) => {
  if (!isValidElement(element)) {
    return null
  }
  return recursiveReactElement(element, child =>
    cloneElement(child, {
      ...child.props,
      ...props
    })
  )
}

// 注册组件
export const registerComponent = (name: string, data: IComponentData) => {
  if (isEmpty(name)) {
    return
  }
  COMPONENTS_MAP[name] = data
}

export const registerComponents = (data: IComponentData) => {
  if (isEmpty(data) || !isObj(data)) {
    return
  }
  Object.entries(data).forEach(([key, value]) => {
    registerComponent(key, value)
  })
}

export const getComponent = (name: string) => COMPONENTS_MAP[name]

export const getComponents = () => COMPONENTS_MAP

// 注册默认的schema属性，拖拽左侧组件后，会用注册的默认schema在预览区域生成一个Field
// name参数与注册的组件中的x-component属性对应
export const registerDefaultSchema = (name: string, schema: ISchema) => {
  if (isEmpty(name)) {
    return
  }
  DEFAULT_SCHEMA[name] = schema
}

export const getDefaultSchema = (name: string) => DEFAULT_SCHEMA[name]

// 注册插件
export const registerPlugin = (plugin: IPlugin) => {
  if (isEmpty(plugin) || !isFn(plugin)) {
    return
  }
  PLUGINS.push(plugin)
}

export const registerPlugins = (plugins: IPlugin[]) => {
  if (isEmpty(plugins) || !isArr(plugins)) {
    return
  }
  plugins.forEach(plugin => registerPlugin(plugin))
}

export const applyPlugins = (api: IBuilderApi) => {
  PLUGINS.forEach(plugin => plugin(api))
}
