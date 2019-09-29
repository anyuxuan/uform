import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('date', {
  meta: {
    type: 'date',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '日期',
    'x-component': 'date'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '日期',
    description: ''
  })
})

registerDefaultSchema('date', {
  type: 'date',
  'x-component': 'date',
  title: '日期',
  properties: {}
})
