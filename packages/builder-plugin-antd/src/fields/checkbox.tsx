import React, { Fragment } from 'react'
import { registerComponent } from '@uform/builder'
import { Field } from '@uform/antd'

registerComponent('checkbox', {
  meta: {
    type: 'string',
    icon: '//img.alicdn.com/tfs/TB1UZ_1dGL7gK0jSZFBXXXZZpXa-32-32.svg',
    label: '多选框',
    'x-component': 'checkbox'
  },
  renderer: () => (
    <Fragment>
      <Field
        type="string"
        title="默认选中项"
        name="switch"
        x-component="checkbox"
      />
    </Fragment>
  )
})
