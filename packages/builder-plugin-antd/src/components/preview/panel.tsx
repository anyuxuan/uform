import React from 'react'
import classNames from 'classnames'
import { clone } from '@uform/utils'
import { SchemaForm } from '@uform/antd'
import { Container } from './style'

const PreviewPanel = ({ props, ctx }) => {
  const { api, effects, schema } = ctx
  const { actions } = api
  const { className, ...others } = props
  const wrapperCls = classNames(className, 'preview-panel')

  return (
    <Container className={wrapperCls} {...others}>
      <SchemaForm
        schema={clone(schema)}
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
