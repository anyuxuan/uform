import React, { useContext, useCallback } from 'react'
import classNames from 'classnames'
import { registerFieldMiddleware } from '@uform/antd'
import { BuilderContext } from '@uform/builder'

// 布局类的字段类型
const LAYOUT_FIELDS = ['layout']

registerFieldMiddleware(Field => {
  return props => {
    const { api, global } = useContext(BuilderContext)
    const { actions } = api
    const { currentFieldName } = global
    const { name, schema } = props
    if (!name) {
      return <Field {...props} />
    }
    const onClick = useCallback(
      e => {
        e.stopPropagation()
        if (schema['x-props'] && schema['x-props'].target === 'configPanel') {
          return
        }
        // 只有点击预览面板中字段，才会触发onClickField事件
        actions.clickField({
          name,
          type: schema['x-component'] || schema.type,
          uniqueId: schema.uniqueId
        })
      },
      [name, actions, schema]
    )
    const cls = classNames(schema.className, 'field-wrapper', {
      active: name === currentFieldName,
      layout: LAYOUT_FIELDS.some(
        type => type === schema['x-component'] || type === schema.type
      )
    })
    return (
      <div className={cls} onClick={onClick}>
        <Field {...props} />
      </div>
    )
  }
})
