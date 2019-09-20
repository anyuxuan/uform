import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createEffects, useEva } from 'react-eva'
import { isEmpty, isFn } from '@uform/utils'
import { ISchema } from '@uform/types'
import { applyPlugins, BuilderContext, getDefaultSchema } from './shared'
import { SCHEMA_ACTIONS, useApi, useSchema } from './hooks'

let nameId = 0

// 控制字段的显示顺序
let index = 0

let initialized = false

// 所有面板的初始状态
const INITIAL_PANEL_VISIBLE_MAP = {
  fieldPanel: false,
  codePanel: false
}

const App = props => {
  const [schema, dispatchSchemaAction] = useSchema()
  const [currentFieldName, setCurrentFieldName] = useState('')
  const [currentFieldType, setCurrentFieldType] = useState('')
  // 因为effects中无法拿到最新的useState快照数据，所以创建了一个ref来存储当前最新的fieldName和fieldType
  const currentFieldRef = useRef(null)
  const [panelVisibleMap, setPanelVisibleMap] = useState(
    INITIAL_PANEL_VISIBLE_MAP
  )

  const { children, actions, effects } = props

  const combineEffects = effects => {
    return createEffects($ => {
      if (!isEmpty(effects) && isFn(effects)) {
        effects($)
      }
      $('onAddField').subscribe((fieldType, autoIncrease = true) => {
        const name = autoIncrease ? `${fieldType}_${nameId++}` : fieldType
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
      $('onDeleteField').subscribe(() => {
        const { fieldName } = currentFieldRef.current
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.DELETE,
          payload: fieldName
        })
      })
      $('onAlterField').subscribe(property => {
        const { fieldName } = currentFieldRef.current
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ALTER,
          payload: {
            fieldName,
            property
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
              prev[key] = key === type ? !value : false
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

  const api = useApi({ actions })

  if (!initialized) {
    implementActions({
      addField: (fieldType: string, autoIncrease?: boolean) => {
        dispatch('onAddField', fieldType, autoIncrease)
      },
      deleteField: () => dispatch('onDeleteField'),
      alterField: property => dispatch('onAlterField', property),
      addFieldProperty: (property: ISchema) => {
        const { fieldName } = currentFieldRef.current
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ADD_PROPERTY,
          payload: {
            fieldName,
            property
          }
        })
      },
      clickField: ({ name, type }) => {
        setCurrentFieldName(name)
        setCurrentFieldType(type)
      },
      dispatch
    })
    // 执行所有注册的插件
    applyPlugins(api)
    initialized = true
  }

  useEffect(() => {
    currentFieldRef.current = {
      fieldName: currentFieldName,
      fieldType: currentFieldType
    }
  }, [currentFieldName, currentFieldType])

  // 一些全局状态
  const global = useMemo(
    () => ({
      currentFieldName,
      currentFieldType,
      panelVisibleMap
    }),
    [currentFieldName, currentFieldType, panelVisibleMap]
  )

  const context = useMemo(
    () => ({
      effects: combinedEffects,
      schema,
      global,
      api
    }),
    [combinedEffects, schema, global, api]
  )

  return (
    <BuilderContext.Provider value={context}>
      {context && children}
    </BuilderContext.Provider>
  )
}

export default App
