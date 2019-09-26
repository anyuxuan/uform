import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('radio', {
  meta: {
    type: 'string',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '单选',
    'x-component': 'radio'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '单选',
    default: 1
  })
})

registerDefaultSchema('radio', {
  type: 'radio',
  'x-component': 'radio',
  title: '单选',
  enum: [
    {
      label: '选项一',
      value: 1
    },
    {
      label: '选项二',
      value: 2
    },
    {
      label: '选项三',
      value: 3
    }
  ],
  properties: {}
})
