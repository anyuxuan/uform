import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('year', {
  meta: {
    type: 'year',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '年份选择',
    'x-component': 'year'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '年份选择',
    default: 1
  })
})

registerDefaultSchema('year', {
  type: 'year',
  'x-component': 'year',
  title: '年份选择',
  properties: {}
})
