import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('month', {
  meta: {
    type: 'month',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '月份选择',
    'x-component': 'month'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '月份选择',
    default: 1
  })
})

registerDefaultSchema('month', {
  type: 'month',
  'x-component': 'month',
  title: '月份选择',
  properties: {}
})
