import * as React from 'react'
import { ISchema } from '@uform/types'

interface IAction {
  type: SCHEMA_ACTIONS
  payload: any
}

export const enum SCHEMA_ACTIONS {
  ADD = 'ADD',
  DELETE = 'DELETE',
  ALTER = 'ALTER',
  GET = 'GET'
}

const DEFAULT_SCHEMA: ISchema = {
  type: 'object',
  properties: {}
}

const reducer: React.Reducer<ISchema, IAction> = (state, action) => {
  const properties = {}
  switch (action.type) {
    case SCHEMA_ACTIONS.ADD:
      return {
        ...state,
        properties: {
          ...state.properties,
          ...action.payload
        }
      }
    case SCHEMA_ACTIONS.DELETE:
      Object.entries(state.properties).forEach(([key, value]) => {
        if (key !== action.payload) {
          properties[key] = value
        }
      })
      return {
        ...state,
        properties
      }
    case SCHEMA_ACTIONS.ALTER:
      const { fieldName, data } = action.payload
      Object.entries(state.properties).forEach(([key, value]) => {
        if (key === fieldName) {
          properties[key] = {
            ...value,
            ...data
          }
        } else {
          properties[key] = value
        }
      })
      return {
        ...state,
        properties
      }
    case SCHEMA_ACTIONS.GET:
      return state
    default:
      return state
  }
}

const useSchema = (schema?: ISchema) => {
  return React.useReducer(reducer, schema || DEFAULT_SCHEMA)
}

export default useSchema
