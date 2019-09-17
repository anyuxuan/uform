import React, { Fragment } from 'react'
import { registerComponent } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('array', {
  meta: {
    type: 'array',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '数组',
    'x-component': 'array'
  },
  renderer: () => (
    <Fragment>
      <Field
        type="string"
        title="标题"
        name="title"
        x-effect={dispatch => ({
          onChange(e) {
            const { value } = e.target
            dispatch('onAlterPreviewField', {
              title: value
            })
          }
        })}
      />
      <Field
        type="string"
        title="显示标题"
        name="showTitle"
        x-component="boolean"
      />
    </Fragment>
  )
})
