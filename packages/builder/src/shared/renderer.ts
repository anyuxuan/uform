import { isEmpty, isFn } from '@uform/utils'
import {
  IBuilderRenderers,
  IPanelRenderer,
  IPanelRendererMap,
  RENDERERS_NAMES
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
  asidePanel(renderer: IPanelRenderer) {
    registerRenderer(RENDERERS_NAMES.ASIDE_PANEL, renderer)
  },
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
