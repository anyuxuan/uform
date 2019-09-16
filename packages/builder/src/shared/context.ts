import React, { createContext } from 'react'
import { IBuilderContext } from '../types'

export const BuilderContext: React.Context<IBuilderContext> = createContext(
  null
)
