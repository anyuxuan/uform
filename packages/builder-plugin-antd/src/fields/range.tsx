import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('range', {
  meta: {
    type: 'range',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '范围选择',
    'x-component': 'range'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '范围选择',
    default: 1
  })
})

registerDefaultSchema('range', {
  type: 'range',
  'x-component': 'range',
  title: '范围选择',
  properties: {}
})
