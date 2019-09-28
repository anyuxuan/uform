import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('upload', {
  meta: {
    type: 'upload',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '上传',
    'x-component': 'upload'
  },
  renderer: () => (
    <Fragment>
      <Field type="string" title="标题" name="title" />
      <Field type="string" title="描述信息" name="description" />
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '上传'
  })
})

registerDefaultSchema('upload', {
  type: 'upload',
  'x-component': 'upload',
  title: '上传',
  'x-props': {
    listType: 'card'
  }
})
