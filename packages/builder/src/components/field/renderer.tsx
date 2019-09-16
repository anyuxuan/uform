import { useMemo, useContext } from 'react'
import { getRenderer } from '../../shared'
import { BuilderContext } from '../../shared'

const FieldPanelRenderer = props => {
  const { global } = useContext(BuilderContext)
  const { panelVisibleMap } = global

  const panelRenderer = useMemo(() => getRenderer('sourcePanel'), [getRenderer])

  return panelRenderer({
    props,
    visible: panelVisibleMap.fieldPanel
  })
}

export default FieldPanelRenderer
