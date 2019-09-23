import React, { Fragment } from 'react'
import {
  registerComponent,
  registerDefaultSchema,
  getComponents
} from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('layout', {
  meta: {
    type: 'layout',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '布局组件',
    'x-component': 'layout'
  },
  renderer: () => {
    const components = getComponents()
    const fieldsEnum = Object.keys(components).map(key => {
      const item = components[key]
      return {
        label: item && item.meta ? item.meta.label : '',
        value: key
      }
    })
    return (
      <Fragment>
        <Field name="fields" title="添加字段" type="array">
          <Field type="string" enum={fieldsEnum} />
        </Field>
      </Fragment>
    )
  },
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
