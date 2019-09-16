import { registerPlugin } from '@uform/builder'
import PreviewPanel from './panel'

registerPlugin(api => {
  api.renderers.previewerPanel(PreviewPanel)
})
