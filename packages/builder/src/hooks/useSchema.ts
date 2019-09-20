import React, { useReducer } from 'react'
import { ISchema } from '@uform/types'

interface ISchemaAction {
  type: SCHEMA_ACTIONS
  payload: any
}

export const enum SCHEMA_ACTIONS {
  ADD = 'ADD',
  DELETE = 'DELETE',
  ALTER = 'ALTER',
  GET = 'GET',
  ADD_PROPERTY = 'ADD_PROPERTY'
}

const DEFAULT_SCHEMA: ISchema = {
  type: 'object',
  properties: {}
}

const reducer: React.Reducer<ISchema, ISchemaAction> = (state, action) => {
  const properties = {}
  switch (action.type) {
    case SCHEMA_ACTIONS.ADD: {
      return {
        ...state,
        properties: {
          ...state.properties,
          ...action.payload
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
      const { fieldName, property } = action.payload
      Object.entries(state.properties).forEach(([key, value]) => {
        if (key === fieldName) {
          properties[key] = {
            ...value,
            ...property
          }
        } else {
          properties[key] = value
        }
      })
      return {
        ...state,
        properties
      }
    }
    case SCHEMA_ACTIONS.ADD_PROPERTY: {
      const { fieldName, property } = action.payload
      Object.entries(state.properties).forEach(([key, value]) => {
        if (key === fieldName) {
          properties[key] = {
            ...value,
            properties: {
              ...(value.properties ? value.properties : {}),
              ...property
            }
          }
        } else {
          properties[key] = value
        }
      })
      return {
        ...state,
        properties
      }
    }
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
