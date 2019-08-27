import * as React from 'react'
import { useEva, createEffects } from 'react-eva'
import { BuilderContext } from './shared'

const App = props => {
  const getEffects = effects => {
    return createEffects($ => {
      if (effects && typeof effects === 'function') {
        effects($)
      }
      $('onAddField').subscribe(() => {
        // console.log('onAddField')
      })
    })
  }

  const { children, actions, effects } = props
  // 将传入和effect与默认的effects合并
  const combinedEffects = getEffects(effects)
  const { implementActions, dispatch } = useEva({
    actions,
    effects: combinedEffects
  })
  const [contextValue, setContextValue] = React.useState(null)

  const initActions = () => {
    implementActions({
      addField: () => {
        dispatch('onAddField')
      }
    })
  }

  const initContext = () => {
    setContextValue({
      actions,
      effects: combinedEffects
    })
  }

  React.useEffect(() => {
    initActions()
    initContext()
    dispatch('onBuilderMount')
  }, [])

  return (
    <BuilderContext.Provider value={contextValue}>
      {contextValue && children}
    </BuilderContext.Provider>
  )
}

export default App
