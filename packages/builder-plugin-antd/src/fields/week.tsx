import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('week', {
  meta: {
    type: 'week',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '周选择',
    'x-component': 'week'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '周选择',
    default: 1
  })
})

registerDefaultSchema('week', {
  type: 'week',
  'x-component': 'week',
  title: '周选择',
  properties: {}
})
