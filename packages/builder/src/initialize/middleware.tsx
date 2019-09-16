import React, { useContext, useCallback } from 'react'
import { registerFieldMiddleware } from '@uform/react'
import { BuilderContext } from '../shared'

registerFieldMiddleware(Field => {
  return props => {
    const { api } = useContext(BuilderContext)
    const { actions } = api
    const { name, schema } = props
    if (!name) {
      return <Field {...props} />
    }
    const onClick = useCallback(() => {
      if (schema['x-props'] && schema['x-props'].from === 'config') {
        return
      }
      // 只有点击预览面板中字段，才会触发onClickField事件
      actions.dispatch('onClickField', {
        name,
        type: schema['x-component'] || schema.type
      })
    }, [actions])
    return (
      <div onClick={onClick}>
        <Field {...props} />
      </div>
    )
  }
})
