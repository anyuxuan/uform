import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { SchemaForm, Field } from '@uform/react'

const Container = styled.div`
  &.preview-panel {
    flex: 1;
    min-height: 100vh;
  }
`

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
