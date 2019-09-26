import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('boolean', {
  meta: {
    type: 'string',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '开关',
    'x-component': 'boolean'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field
        type="string"
        title="默认值"
        name="default"
        x-component="boolean"
      />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '开关'
  })
})

registerDefaultSchema('boolean', {
  type: 'boolean',
  'x-component': 'boolean',
  title: '开关',
  properties: {}
})
