import * as React from 'react'
import { createEffects, useEva } from 'react-eva'
import { isEmpty, isFn } from '@uform/utils'
import { BuilderContext, getDefaultSchema } from './shared'
import { SCHEMA_ACTIONS, useSchema } from './hooks'

let nameId = 0
// 控制字段的显示顺序
let index = 0

// 所有面板的初始状态
const INITIAL_PANEL_VISIBLE_MAP = {
  fieldPanel: false,
  codePanel: false
}

const App = props => {
  const [schema, dispatchSchemaAction] = useSchema()
  const [currentFieldName, setCurrentFieldName] = React.useState('')
  const [currentFieldType, setCurrentFieldType] = React.useState('')
  const [panelVisibleMap, setPanelVisibleMap] = React.useState(
    INITIAL_PANEL_VISIBLE_MAP
  )

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
      $('onSetPanelVisible').subscribe(type => {
        // 将当前操作的面板状态置反，其他面板状态设置为false
        setPanelVisibleMap(visibleMap =>
          Object.entries(visibleMap).reduce(
            (prev, [key, value]) => {
              if (key === type) {
                prev[key] = !value
              } else {
                prev[key] = false
              }
              return prev
            },
            {} as any
          )
        )
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
      clickField: ({ name, type }) => {
        setCurrentFieldName(name)
        setCurrentFieldType(type)
      },
      dispatch
    })
  }, [])

  // 一些全局状态
  const global = React.useMemo(
    () => ({
      currentFieldName,
      currentFieldType,
      panelVisibleMap
    }),
    [currentFieldName, currentFieldType, panelVisibleMap]
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
