import React from 'react'
import { registerPlugin, CommonRenderer } from '@uform/builder'
import Panel from './panel'

const RENDERER_NAME = 'codePanel'

registerPlugin(api => {
  api.renderers.registerRenderer(RENDERER_NAME, Panel)
})

export default props => (
  <CommonRenderer {...props} rendererName={RENDERER_NAME} />
)
