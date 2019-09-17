import { useMemo, useContext } from 'react'
import { getRenderer, BuilderContext } from '../../shared'
import { RENDERERS_NAMES } from '../../types'

const FieldPanelRenderer = props => {
  const { global } = useContext(BuilderContext)
  const { panelVisibleMap } = global

  const panelRenderer = useMemo(
    () => getRenderer(RENDERERS_NAMES.SOURCE_PANEL),
    [getRenderer]
  )

  return panelRenderer({
    props,
    visible: panelVisibleMap.fieldPanel
  })
}

export default FieldPanelRenderer
