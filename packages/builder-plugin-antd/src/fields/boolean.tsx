import React, { Fragment } from 'react'
import { registerComponent } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('boolean', {
  meta: {
    type: 'string',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '单选框',
    'x-component': 'boolean'
  },
  renderer: () => (
    <Fragment>
      <Field
        type="string"
        title="默认开关"
        name="switch"
        x-component="boolean"
        x-effect={dispatch => ({
          onChange(checked) {
            // console.log(checked, 'checked')
          }
        })}
      />
    </Fragment>
  )
})
