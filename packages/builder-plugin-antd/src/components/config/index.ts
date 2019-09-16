import { registerPlugin } from '@uform/builder'
import ConfigPanel from './panel'

registerPlugin(api => {
  api.renderers.configurePanel(ConfigPanel)
})
