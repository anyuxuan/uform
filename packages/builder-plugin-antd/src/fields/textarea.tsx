import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('textarea', {
  meta: {
    type: 'textarea',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '多行输入框',
    'x-component': 'textarea'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '多行输入框',
    description: ''
  })
})

registerDefaultSchema('textarea', {
  type: 'textarea',
  'x-component': 'textarea',
  title: '多行输入框',
  properties: {}
})
