import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('number', {
  meta: {
    type: 'number',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '数字',
    'x-component': 'number'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '数字',
    description: ''
  })
})

registerDefaultSchema('number', {
  type: 'string',
  'x-component': 'number',
  title: '数字',
  properties: {}
})
