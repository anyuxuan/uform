import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('password', {
  meta: {
    type: 'password',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '密码',
    'x-component': 'password'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '密码',
    default: 1
  })
})

registerDefaultSchema('password', {
  type: 'string',
  'x-component': 'password',
  title: '密码',
  properties: {}
})
