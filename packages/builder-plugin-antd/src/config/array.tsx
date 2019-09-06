import * as React from 'react'
import { Field } from '@uform/antd'
import { registerConfig } from '@uform/builder'

registerConfig('array', ({ actions }) => (
  <React.Fragment>
    <Field
      type="string"
      title="标题"
      name="title"
      x-props={{
        from: 'config'
      }}
    />
    <Field
      type="string"
      title="显示标题"
      name="showTitle"
      x-component="boolean"
      x-props={{
        from: 'config'
      }}
    />
  </React.Fragment>
))
