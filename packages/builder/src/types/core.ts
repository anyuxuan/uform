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

export const enum RENDERERS_NAMES {
  SOURCE_PANEL = 'sourcePanel',
  CONFIGURE_PANEL = 'configurePanel',
  PREVIEW_PANEL = 'previewerPanel'
}

export type IPanelRenderer = (data: any) => React.ReactElement

export type ISourcePanelRenderer = (renderer: IPanelRenderer) => void

export type IConfigurePanelRenderer = (renderer: IPanelRenderer) => void

export type IPreviewerPanelRenderer = (renderer: IPanelRenderer) => void

export type IPanelRendererMap = {
  [name in RENDERERS_NAMES]?: IPanelRenderer
}

export interface IBuilderRenderers {
  sourcePanel: ISourcePanelRenderer
  configurePanel: IConfigurePanelRenderer
  previewerPanel: IPreviewerPanelRenderer
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
