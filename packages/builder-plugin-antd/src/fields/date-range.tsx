import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('daterange', {
  meta: {
    type: 'daterange',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '日期区间',
    'x-component': 'daterange'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '日期区间',
    description: ''
  })
})

registerDefaultSchema('daterange', {
  type: 'daterange',
  'x-component': 'daterange',
  title: '日期区间',
  properties: {}
})
