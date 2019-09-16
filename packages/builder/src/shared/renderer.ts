import { isEmpty, isFn } from '@uform/utils'
import { IBuilderRenderers, IPanelRenderer, IPanelRendererMap } from '../types'

const RENDERERS_MAP: IPanelRendererMap = {}

export const registerRenderer = (name: string, renderer: IPanelRenderer) => {
  if (isEmpty(name) || !isFn(renderer)) {
    return
  }
  RENDERERS_MAP[name] = renderer
}

export const getRenderer = (name: keyof IPanelRendererMap) => {
  return RENDERERS_MAP[name]
}

export const renderers: IBuilderRenderers = {
  sourcePanel(renderer: IPanelRenderer) {
    registerRenderer('sourcePanel', renderer)
  },
  configurePanel(renderer: IPanelRenderer) {
    registerRenderer('configurePanel', renderer)
  },
  previewerPanel(renderer: IPanelRenderer) {
    registerRenderer('previewerPanel', renderer)
  }
}
