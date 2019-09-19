import React, { Fragment } from 'react'
import {
  registerComponent,
  registerDefaultSchema,
  getComponents,
  getDefaultSchema
} from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('layout', {
  meta: {
    type: 'layout',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '布局组件',
    'x-component': 'layout'
  },
  renderer: ({ ctx }) => {
    const { api, global } = ctx
    const { actions } = api
    const { currentFieldName } = global
    const components = getComponents()
    const fieldsEnum = Object.entries(components).map(([name, data]) => ({
      label: data.meta.label,
      value: name
    }))
    return (
      <Fragment>
        <Field name="fields" title="添加字段" type="array">
          <Field
            type="string"
            enum={fieldsEnum}
            x-effect={() => ({
              onChange(value) {
                const property = {
                  [value]: getDefaultSchema(value)
                }
                actions.addFieldProperty(currentFieldName, property)
              }
            })}
          />
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
