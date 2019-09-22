import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('array', {
  meta: {
    type: 'array',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '数组',
    'x-component': 'array'
  },
  renderer: ({ ctx }) => {
    const { api } = ctx
    const { actions } = api
    return (
      <Fragment>
        <Field
          type="string"
          title="标题"
          name="title"
          x-effect={() => ({
            onChange(e) {
              const { value } = e.target
              actions.alterField({ title: value })
            }
          })}
        />
      </Fragment>
    )
  },
  getDefaultValue: () => ({
    title: '数组'
  })
})

registerDefaultSchema('array', {
  type: 'array',
  'x-component': 'array',
  title: '数组',
  items: {
    type: 'object',
    properties: {
      item1: {
        type: 'string',
        title: '字段1'
      }
    }
  }
})
