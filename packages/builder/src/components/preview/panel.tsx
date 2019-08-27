import * as React from 'react'
import classNames from 'classnames'
import { SchemaForm, Field } from '@uform/react'
import { Container } from './style'

const PreviewPanel = props => {
  const { className, ...others } = props
  const wrapperCls = classNames('preview-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      预览区
      <SchemaForm>
        <Field type="string" title="姓名" name="name" />
      </SchemaForm>
    </Container>
  )
}

export default PreviewPanel
