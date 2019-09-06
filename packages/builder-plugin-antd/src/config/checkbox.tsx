import * as React from 'react'
import { Field } from '@uform/antd'
import { registerConfig } from '@uform/builder'

registerConfig('checkbox', ({ actions }) => (
  <React.Fragment>
    <Field
      type="string"
      title="默认选中项"
      name="switch"
      x-component="checkbox"
      x-props={{
        from: 'config'
      }}
    />
  </React.Fragment>
))
