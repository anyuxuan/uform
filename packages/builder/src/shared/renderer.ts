import { isEmpty, isFn } from '@uform/utils'
import {
  RENDERERS_NAMES,
  IBuilderRenderers,
  IPanelRenderer,
  IPanelRendererMap
} from '../types'

const RENDERERS_MAP: IPanelRendererMap = {}

export const registerRenderer = (
  name: RENDERERS_NAMES,
  renderer: IPanelRenderer
) => {
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
    registerRenderer(RENDERERS_NAMES.SOURCE_PANEL, renderer)
  },
  configurePanel(renderer: IPanelRenderer) {
    registerRenderer(RENDERERS_NAMES.CONFIGURE_PANEL, renderer)
  },
  previewerPanel(renderer: IPanelRenderer) {
    registerRenderer(RENDERERS_NAMES.PREVIEW_PANEL, renderer)
  }
}
