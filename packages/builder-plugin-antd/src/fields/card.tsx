import React, { Fragment } from 'react'
import {
  getComponents,
  registerComponent,
  registerDefaultSchema
} from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('card', {
  meta: {
    type: 'card',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '卡片',
    'x-component': 'card'
  },
  renderer: () => {
    const components = getComponents()
    const fieldsEnum = Object.keys(components).map(key => {
      const item = components[key]
      return {
        label: item && item.meta ? item.meta.label : '',
        value: item && item.meta ? item.meta['x-component'] : ''
      }
    })
    return (
      <Fragment>
        <Field type="string" title="标题" name="cardTitle" />
        <Field
          name="fields"
          title="添加字段"
          type="array"
          x-props={{
            className: 'fields-array-item'
          }}
        >
          <Field type="string" enum={fieldsEnum} />
        </Field>
      </Fragment>
    )
  },
  getDefaultValue: () => ({
    cardTitle: '卡片',
    description: ''
  })
})

registerDefaultSchema('card', {
  type: 'card',
  'x-component': 'card',
  'x-props': {
    title: '卡片'
  },
  properties: {}
})
