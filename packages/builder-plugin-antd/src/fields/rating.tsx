import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('rating', {
  meta: {
    type: 'rating',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '评分',
    'x-component': 'rating'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '评分',
    description: ''
  })
})

registerDefaultSchema('rating', {
  type: 'rating',
  'x-component': 'rating',
  title: '评分',
  properties: {}
})
