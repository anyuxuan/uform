import React, { Fragment } from 'react'
import { registerComponent, registerDefaultSchema } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('array', {
  meta: {
    type: 'array',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '数组',
    'x-component': 'array'
  },
  renderer: () => {
    return (
      <Fragment>
        <Field type="string" title="标题" name="title" />
        <Field type="string" title="描述信息" name="description" />
        <Field
          type="boolean"
          title="是否必填"
          name="required"
          x-component="boolean"
        />
        <Field
          type="string"
          title="最大条目数"
          name="maxItems"
          x-component="number"
        />
        <Field
          type="string"
          title="最小条目数"
          name="minItems"
          x-component="number"
        />
        <Field
          type="array"
          title="数组项"
          name="items"
          x-props={{
            className: 'fields-array-item'
          }}
        >
          <Field type="string" title="字段一" />
        </Field>
        <Field type="string" title="添加按钮文案" name="addBtnText" />
        <Field type="string" title="删除按钮文案" name="removeBtnText" />
      </Fragment>
    )
  },
  getDefaultValue: () => ({
    title: '数组',
    description: ''
  })
})

registerDefaultSchema('array', {
  type: 'array',
  'x-component': 'array',
  title: '数组',
  items: {
    type: 'object',
    properties: {
      item1: {
        type: 'string',
        title: '字段1'
      }
    }
  }
})
