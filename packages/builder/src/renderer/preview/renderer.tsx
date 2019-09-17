import { useMemo } from 'react'
import { getRenderer } from '../../shared'
import { RENDERERS_NAMES } from '../../types'

const PreviewPanelRenderer = props => {
  const panelRenderer = useMemo(
    () => getRenderer(RENDERERS_NAMES.PREVIEW_PANEL),
    [getRenderer]
  )

  return panelRenderer({ props })
}

export default PreviewPanelRenderer
