import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('cards', {
  meta: {
    type: 'cards',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '卡片',
    'x-component': 'cards'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      {/*<Field*/}
      {/*  type="string"*/}
      {/*  title="默认选中项"*/}
      {/*  name="default"*/}
      {/*  x-component="checkbox"*/}
      {/*/>*/}
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '卡片',
    default: 1
  })
})

registerDefaultSchema('cards', {
  type: 'cards',
  'x-component': 'cards',
  title: '卡片',
  properties: {}
})
