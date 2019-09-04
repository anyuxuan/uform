import * as React from 'react'
import { Field } from '@uform/antd'
import { registerConfig } from '@uform/builder'

registerConfig('array', ({ actions }) => (
  <Field type="string" title="设置标题" name="title" />
))
