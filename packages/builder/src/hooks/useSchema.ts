import React, { useReducer } from 'react'
import { clone } from '@uform/utils'
import { deepMapObj, isPlainObj } from '../utils'
import { IExtendedSchema } from '../types'

interface ISchemaAction {
  type: SCHEMA_ACTIONS
  payload: any
}

export const enum SCHEMA_ACTIONS {
  ADD = 'ADD',
  DELETE = 'DELETE',
  ALTER = 'ALTER',
  GET = 'GET',
  ADD_PROPERTY = 'ADD_PROPERTY',
  ADD_ITEMS = 'ADD_ITEMS'
}

const DEFAULT_SCHEMA: IExtendedSchema = {
  type: 'object',
  properties: {}
}

const reducer: React.Reducer<IExtendedSchema, ISchemaAction> = (
  state,
  action
) => {
  switch (action.type) {
    case SCHEMA_ACTIONS.ADD: {
      const { property } = action.payload
      return {
        ...state,
        properties: {
          ...state.properties,
          ...property
        }
      }
    }
    case SCHEMA_ACTIONS.DELETE: {
      const { uniqueId } = action.payload
      const clonedState = clone(state)
      return deepMapObj(clonedState, (value, key, obj) => {
        if (!isPlainObj(value) || !value.uniqueId || !uniqueId) {
          return
        }
        if (value.uniqueId === uniqueId) {
          delete obj[key]
        }
      })
    }
    case SCHEMA_ACTIONS.ALTER: {
      const { property, uniqueId } = action.payload
      const clonedState = clone(state)
      return deepMapObj(clonedState, value => {
        if (!isPlainObj(value) || !value.uniqueId || !uniqueId) {
          return
        }
        if (value.uniqueId === uniqueId) {
          const ret = {
            ...value,
            ...property
          }
          const { 'x-props': prevProps } = value
          const { 'x-props': currProps } = property
          if (prevProps && currProps) {
            ret['x-props'] = {
              ...prevProps,
              ...currProps
            }
          }
          return ret
        }
      })
    }
    case SCHEMA_ACTIONS.ADD_PROPERTY: {
      const { property, uniqueId } = action.payload
      const clonedState = clone(state)
      return deepMapObj(clonedState, value => {
        if (!isPlainObj(value) || !value.uniqueId || !uniqueId) {
          return
        }
        if (value.uniqueId === uniqueId) {
          value.properties = {
            ...value.properties,
            ...property
          }
        }
      })
    }
    case SCHEMA_ACTIONS.ADD_ITEMS:
      return state
    case SCHEMA_ACTIONS.GET:
      return state
    default:
      return state
  }
}

const useSchema = (schema?: IExtendedSchema) => {
  return useReducer(reducer, schema || DEFAULT_SCHEMA)
}

export default useSchema
