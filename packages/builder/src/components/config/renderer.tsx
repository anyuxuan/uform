import { useMemo } from 'react'
import { getRenderer } from '../../shared'
import { RENDERERS_NAMES } from '../../types'

const ConfigPanelRenderer = props => {
  const panelRenderer = useMemo(
    () => getRenderer(RENDERERS_NAMES.CONFIGURE_PANEL),
    [getRenderer]
  )

  return panelRenderer({
    props
  })
}

export default ConfigPanelRenderer
