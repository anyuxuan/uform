import { registerPlugin } from '@uform/builder'
import FieldPanel from './panel'

registerPlugin(api => {
  api.renderers.sourcePanel(FieldPanel)
})
