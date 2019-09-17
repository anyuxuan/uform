import React from 'react'
import { ISchema } from '@uform/types'

export type IPlugin = (api: any) => any

export interface IComponentMeta {
  label: string
  icon: string
  type: string
  ['x-component']: string
}

// 组件面板中每个组件对应的配置区域渲染器
export type IComponentRenderer = (...params: any[]) => any

export interface IComponentData {
  meta: IComponentMeta
  renderer: IComponentRenderer
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
