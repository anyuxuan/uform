import * as React from 'react'
import classNames from 'classnames'
import { SchemaForm } from '@uform/react'
import { Container } from './style'
import { BuilderContext } from '../../shared'

const PreviewPanel = props => {
  const { actions, effects, schema } = React.useContext(BuilderContext)
  const { className, ...others } = props
  const wrapperCls = classNames('preview-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      <SchemaForm schema={schema} actions={actions} effects={effects} />
    </Container>
  )
}

export default PreviewPanel
