import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('time', {
  meta: {
    type: 'time',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '时间选择',
    'x-component': 'time'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '时间选择',
    default: 1
  })
})

registerDefaultSchema('time', {
  type: 'time',
  'x-component': 'time',
  title: '时间选择',
  properties: {}
})
