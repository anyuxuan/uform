import * as React from 'react'
import { useEva, createEffects } from 'react-eva'
import { isEmpty, isFn } from '@uform/utils'
import { BuilderContext, getDefaultSchema } from './shared'
import { useSchema, SCHEMA_ACTIONS } from './hooks'

let nameId = 0

const App = props => {
  const [schema, dispatchSchemaAction] = useSchema()

  const { children, actions, effects } = props
  const combineEffects = effects => {
    return createEffects($ => {
      if (!isEmpty(effects) && isFn(effects)) {
        effects($)
      }
      $('onAddField').subscribe(fieldType => {
        const name = `${fieldType}_${nameId++}`
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ADD,
          payload: {
            [name]: getDefaultSchema(fieldType)
          }
        })
      })
      $('onDeleteField').subscribe(fieldType => {
        // console.log('onDeleteField', fieldType)
      })
      $('onAlterField').subscribe(fieldType => {
        // console.log('onAlterField', fieldType)
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
      schema
    }),
    [actions, combinedEffects, schema]
  )

  return (
    <BuilderContext.Provider value={context}>
      {context && children}
    </BuilderContext.Provider>
  )
}

export default App
