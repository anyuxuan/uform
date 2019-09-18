import React from 'react'
import { ISchema } from '@uform/types'

export type IPlugin = (api: any) => any

export interface IComponentMeta {
  label: string
  icon: string
  type: string
  ['x-component']: string
}

export type IComponentRenderer = (...params: any[]) => any

export type IComponentValueGetter = () => { [k: string]: any }

export interface IComponentData {
  // 组件面板的数据
  meta: IComponentMeta
  //组件面板中每个组件对应的配置面板渲染器
  renderer: IComponentRenderer
  // 返回值为配置面板表单的默认值
  getDefaultValue: IComponentValueGetter
}

export interface IComponentMap {
  [name: string]: IComponentData
}

export interface IDefaultSchema {
  [k: string]: ISchema
}

export interface IConnectedProps {
  [k: string]: any
}

export interface IBuilderActions {
  addField: any
  deleteField: any
  alterField: any
  clickField: any
  dispatch: any
}

export type IPanelRenderer = (data: any) => React.ReactElement

export type IPanelRendererMap = {
  [name in string]?: IPanelRenderer
}

export interface IBuilderRenderers {
  registerRenderer: (name: string, renderer: IPanelRenderer) => void
  getRenderer: (name: keyof IPanelRendererMap) => void
}

export interface IBuilderHooks {
  onInit: any
  onMount: any
  trigger: any
}

export interface IBuilderApi {
  actions: IBuilderActions
  renderers: IBuilderRenderers
  hooks: IBuilderHooks
}
