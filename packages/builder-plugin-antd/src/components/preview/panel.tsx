import React, { useContext } from 'react'
import classNames from 'classnames'
import { SchemaForm } from '@uform/react'
import { BuilderContext } from '@uform/builder'
import { Container } from './style'

const PreviewPanel = ({ props }) => {
  const { api, effects, schema } = useContext(BuilderContext)
  const { actions } = api
  const { className, ...others } = props
  const wrapperCls = classNames(className, 'preview-panel')

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