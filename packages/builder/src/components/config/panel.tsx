import * as React from 'react'
import classNames from 'classnames'
import { SchemaForm, createFormActions } from '@uform/react'
import { Container } from './style'
import { BuilderContext, getConfig } from '../../shared'

const formActions = createFormActions()

const ConfigPanel = props => {
  const { className, ...others } = props
  const { global } = React.useContext(BuilderContext)
  const { currentField } = global
  const wrapperCls = classNames('config-panel', className)

  const ConfigField = React.useMemo(() => {
    const renderer = getConfig(currentField)
    if (!renderer) {
      return null
    }
    return renderer({ actions: formActions })
  }, [currentField])

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
      <div className="container">
        <SchemaForm actions={formActions}>{ConfigField}</SchemaForm>
      </div>
    </Container>
  )
}

export default ConfigPanel
