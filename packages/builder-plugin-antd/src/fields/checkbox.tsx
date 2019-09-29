import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('checkbox', {
  meta: {
    type: 'string',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '多选',
    'x-component': 'checkbox'
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
    title: '多选',
    description: ''
  })
})

registerDefaultSchema('checkbox', {
  type: 'checkbox',
  'x-component': 'checkbox',
  title: '多选',
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
