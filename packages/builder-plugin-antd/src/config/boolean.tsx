import React from 'react'
import { Field } from '@uform/antd'
import { registerConfig } from '@uform/builder'

registerConfig('boolean', ({ actions }) => (
  <React.Fragment>
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
  </React.Fragment>
))
