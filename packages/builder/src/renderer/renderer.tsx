import { useMemo, useContext } from 'react'
import { isFn } from '@uform/utils'
import { getRenderer, BuilderContext } from '../shared'

const CommonRenderer = props => {
  const ctx = useContext(BuilderContext)
  const { rendererName } = props
  const panelRenderer = useMemo(() => getRenderer(rendererName), [rendererName])

  if (!panelRenderer || !isFn(panelRenderer)) {
    return null
  }

  return panelRenderer({
    props,
    ctx
  })
}

export default CommonRenderer
