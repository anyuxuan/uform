import * as React from 'react'
import { createEffects, useEva } from 'react-eva'
import { isEmpty, isFn } from '@uform/utils'
import { BuilderContext, getDefaultSchema } from './shared'
import { SCHEMA_ACTIONS, useSchema } from './hooks'

let nameId = 0
// 控制字段的显示顺序
let index = 0

const App = props => {
  const [schema, dispatchSchemaAction] = useSchema()
  const [currentField, setCurrentField] = React.useState('')

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
            [name]: {
              ...getDefaultSchema(fieldType),
              'x-index': index++
            }
          }
        })
      })
      $('onDeleteField').subscribe(fieldType => {
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.DELETE,
          payload: fieldType
        })
        // console.log('onDeleteField', fieldType)
      })
      $('onAlterField').subscribe((fieldType, data) => {
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ALTER,
          payload: {
            fieldType,
            data
          }
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

  React.useLayoutEffect(() => {
    implementActions({
      addField: fieldType => dispatch('onAddField', fieldType),
      deleteField: fieldType => dispatch('onDeleteField', fieldType),
      alterField: (fieldType, data) => {
        dispatch('onAlterField', fieldType, data)
      },
      clickField: fieldType => setCurrentField(fieldType),
      dispatch
    })
  }, [])

  // 一些全局状态
  const global = React.useMemo(
    () => ({
      currentField
    }),
    [currentField]
  )

  const context = React.useMemo(
    () => ({
      actions,
      effects: combinedEffects,
      schema,
      global
    }),
    [actions, combinedEffects, schema, global]
  )

  return (
    <BuilderContext.Provider value={context}>
      {context && children}
    </BuilderContext.Provider>
  )
}

export default App
