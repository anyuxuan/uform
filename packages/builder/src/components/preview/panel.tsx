import React, { useContext } from 'react'
import classNames from 'classnames'
import { SchemaForm } from '@uform/react'
import { Container } from './style'
import { BuilderContext } from '../../shared'

const PreviewPanel = props => {
  const { actions, effects, schema } = useContext(BuilderContext)
  const { className, ...others } = props
  const wrapperCls = classNames('preview-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      <SchemaForm
        schema={schema}
        actions={actions}
        effects={$ => {
          effects($)
          $('onClickField').subscribe(fieldOptions => {
            actions.clickField(fieldOptions)
          })
        }}
      />
    </Container>
  )
}

export default PreviewPanel
