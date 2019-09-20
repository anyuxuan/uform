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
  renderer: ({ actions: formActions, ctx }) => {
    const { api } = ctx
    const { actions } = api
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
              onChange() {
                // TODO: 上移/下移，删除字段，无法实时在预览区域展现
                formActions.getFormState(formState => {
                  const { fields } = formState.values || {}
                  if (Array.isArray(fields)) {
                    fields.forEach((fieldType, index) => {
                      if (fieldType) {
                        const property = {
                          [`field_${index}`]: {
                            ...getDefaultSchema(fieldType),
                            'x-index': index
                          }
                        }
                        actions.addFieldProperty(property)
                      }
                    })
                  }
                })
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
