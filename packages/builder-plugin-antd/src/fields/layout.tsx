import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('layout', {
  meta: {
    type: 'layout',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '布局组件',
    'x-component': 'layout'
  },
  renderer: () => (
    <Fragment>
      <Field type="array">
        <Field
          type="string"
          enum={[
            {
              label: '数组',
              value: 'array'
            }
          ]}
        />
      </Field>
    </Fragment>
  ),
  getDefaultValue: () => ({
    title: '布局组件'
  })
})

registerDefaultSchema('layout', {
  type: 'object',
  properties: {},
  'x-component': 'layout',
  'x-props': {
    labelCol: 8,
    wrapperCol: 6
  }
})
