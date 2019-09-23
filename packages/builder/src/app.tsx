import React, { useMemo, useState } from 'react'
import { createEffects, useEva } from 'react-eva'
import uuid from 'uuid'
import { isEmpty, isFn } from '@uform/utils'
import { ISchema } from '@uform/types'
import { applyPlugins, getDefaultSchema, BuilderContext } from './shared'
import {
  SCHEMA_ACTIONS,
  useApi,
  useSchema,
  useCurrent,
  usePanel
} from './hooks'

// 控制字段的显示顺序
let index = 0

let initialized = false

const App = props => {
  const [schema, dispatchSchemaAction] = useSchema()
  const [currentFieldName, setCurrentFieldName] = useState('')
  const [currentFieldType, setCurrentFieldType] = useState('')
  const [currentUniqueId, setCurrentUniqueId] = useState('')
  const currentFieldProps = useCurrent({
    name: currentFieldName,
    type: currentFieldType,
    uniqueId: currentUniqueId
  })
  const [panelVisible, setPanelVisible] = usePanel()

  const { children, actions, effects } = props

  const combineEffects = effects => {
    return createEffects($ => {
      if (!isEmpty(effects) && isFn(effects)) {
        effects($)
      }
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
      addField: (fieldType: string) => {
        const uniqueId = uuid()
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ADD,
          payload: {
            property: {
              [uniqueId]: {
                ...getDefaultSchema(fieldType),
                'x-index': index++,
                uniqueId
              }
            }
          }
        })
      },
      deleteField: () => {
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.DELETE,
          payload: currentFieldName
        })
      },
      alterField: (property: ISchema, id?: string) => {
        const { uniqueId } = currentFieldProps.current
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ALTER,
          payload: {
            uniqueId: id || uniqueId,
            property
          }
        })
      },
      addFieldProperty: (property: ISchema, id?: string) => {
        const { uniqueId } = currentFieldProps.current
        dispatchSchemaAction({
          type: SCHEMA_ACTIONS.ADD_PROPERTY,
          payload: {
            uniqueId: id || uniqueId,
            property
          }
        })
      },
      clickField: ({ name, type, uniqueId }) => {
        setCurrentFieldName(name)
        setCurrentFieldType(type)
        setCurrentUniqueId(uniqueId)
      },
      getCurrentFieldProps: () => currentFieldProps,
      setPanelVisible,
      dispatch
    })
    // 执行所有注册的插件
    applyPlugins(api)
    initialized = true
  }

  // useEffect(() => {
  //   console.log(schema, 'schema')
  // }, [schema])

  // 一些全局状态
  const global = useMemo(
    () => ({
      currentFieldName,
      currentFieldType,
      panelVisible
    }),
    [currentFieldName, currentFieldType, panelVisible]
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
