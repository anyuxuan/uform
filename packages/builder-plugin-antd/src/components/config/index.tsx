import React from 'react'
import { registerPlugin, CommonRenderer } from '@uform/builder'
import Panel from './panel'

registerPlugin(api => {
  api.renderers.configurePanel(Panel)
})

export default props => (
  <CommonRenderer {...props} rendererName="configurePanel" />
)
