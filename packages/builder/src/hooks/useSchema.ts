import React, { useReducer } from 'react'
import { clone } from '@uform/utils'
import { ISchema } from '@uform/types'
import { deepMapObj } from '../utils'

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

const DEFAULT_SCHEMA: ISchema = {
  type: 'object',
  properties: {}
}

const reducer: React.Reducer<ISchema, ISchemaAction> = (state, action) => {
  const properties = {}
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
      Object.entries(state.properties).forEach(([key, value]) => {
        if (key !== action.payload) {
          properties[key] = value
        }
      })
      return {
        ...state,
        properties
      }
    }
    case SCHEMA_ACTIONS.ALTER: {
      const { property, uniqueId } = action.payload
      const clonedState = clone(state)
      return deepMapObj(clonedState, value => {
        if (value && value.uniqueId === uniqueId) {
          return {
            ...value,
            ...property
          }
        }
      })
    }
    case SCHEMA_ACTIONS.ADD_PROPERTY: {
      const { property, uniqueId } = action.payload
      const clonedState = clone(state)
      return deepMapObj(clonedState, value => {
        if (value && value.uniqueId === uniqueId) {
          const newProperty = Object.entries(property).reduce(
            (acc, [fieldKey, fieldProperty]) => {
              const newKey = `${uniqueId}_${fieldKey}`
              acc[newKey] = fieldProperty
              return acc
            },
            {}
          )
          value.properties = {
            ...value.properties,
            ...newProperty
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

const useSchema = (schema?: ISchema) => {
  return useReducer(reducer, schema || DEFAULT_SCHEMA)
}

export default useSchema
