import { useMemo } from 'react'
import { getRenderer } from '../../shared'
import { RENDERERS_NAMES } from '../../types'

const AsidePanelRenderer = props => {
  const panelRenderer = useMemo(
    () => getRenderer(RENDERERS_NAMES.ASIDE_PANEL),
    [getRenderer]
  )
  return panelRenderer({
    props
  })
}

export default AsidePanelRenderer
