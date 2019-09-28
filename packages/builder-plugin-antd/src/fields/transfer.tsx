import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('transfer', {
  meta: {
    type: 'transfer',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '穿梭框',
    'x-component': 'transfer'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '穿梭框'
  })
})

registerDefaultSchema('transfer', {
  type: 'transfer',
  'x-component': 'transfer',
  title: '穿梭框',
  'x-props': {
    render: item => item.title
  },
  enum: [
    {
      key: '1',
      title: '选项一'
    },
    {
      key: '2',
      title: '选项二'
    }
  ]
})
