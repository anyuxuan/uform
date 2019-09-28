import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('table', {
  meta: {
    type: 'table',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '表格',
    'x-component': 'table'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '表格',
    default: 1
  })
})

registerDefaultSchema('table', {
  type: 'array',
  'x-component': 'table',
  title: '表格',
  items: {
    type: 'object',
    properties: {
      item1: {
        type: 'string',
        title: '字段1'
      },
      item2: {
        type: 'string',
        title: '字段2'
      }
    }
  }
})
