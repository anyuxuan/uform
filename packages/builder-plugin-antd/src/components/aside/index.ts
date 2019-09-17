import { registerPlugin } from '@uform/builder'
import AsidePanel from './panel'

registerPlugin(api => {
  api.renderers.asidePanel(AsidePanel)
})
