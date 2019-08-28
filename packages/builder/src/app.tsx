import * as React from 'react'
import { useEva, createEffects } from 'react-eva'
import { BuilderContext, getDetaulSchema } from './shared'

let nameId = 0

const DEFAULT_SCHEMA = {
  type: 'object',
  properties: {}
}

const App = props => {
  const [schema, setSchema] = React.useState(DEFAULT_SCHEMA)

  const updateSchema = React.useCallback(properties => {
    if (!properties) {
      return
    }
    setSchema(schema => ({
      ...schema,
      properties: {
        ...schema.properties,
        ...properties
      }
    }))
  }, [])

  const { children, actions, effects } = props
  const combineEffects = effects => {
    return createEffects($ => {
      if (effects && typeof effects === 'function') {
        effects($)
      }
      $('onAddField').subscribe(fieldType => {
        // console.log('onAddField', fieldType)
        const name = `${fieldType}_${nameId++}`
        updateSchema({
          [name]: getDetaulSchema(fieldType)
        })
      })
      $('onFormInit').subscribe(() => {
        // console.log('onFormInit')
      })
      $('onFormMount').subscribe(() => {
        // console.log('onFormMount')
      })
      $('onTest').subscribe(() => {
        // console.log('onTest')
      })
    })
  }
  // 将传入的effects与默认的effects合并
  const combinedEffects = combineEffects(effects)
  const { implementActions, dispatch } = useEva({
    actions,
    effects: combinedEffects
  })

  React.useEffect(() => {
    implementActions({
      addField: fieldType => dispatch('onAddField', fieldType),
      dispatch
    })
  }, [])

  const context = React.useMemo(
    () => ({
      actions,
      effects: combinedEffects,
      dispatch,
      schema
    }),
    [actions, combinedEffects, dispatch, schema]
  )

  return (
    <BuilderContext.Provider value={context}>
      {context && children}
    </BuilderContext.Provider>
  )
}

export default App
