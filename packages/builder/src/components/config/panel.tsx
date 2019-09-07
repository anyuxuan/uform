import * as React from 'react'
import classNames from 'classnames'
import { SchemaForm, createFormActions } from '@uform/react'
import { Container } from './style'
import { BuilderContext, connectProps, getConfig } from '../../shared'

const formActions = createFormActions()

const ConfigPanel = props => {
  const { className, ...others } = props
  const { global } = React.useContext(BuilderContext)
  const { currentFieldType } = global
  const wrapperCls = classNames('config-panel', className)

  const ConfigField = React.useMemo(() => {
    const renderer = getConfig(currentFieldType)
    if (!renderer) {
      return null
    }
    const element = renderer({ actions: formActions })
    return connectProps({
      'x-props': {
        from: 'config'
      }
    })(element)
  }, [currentFieldType])

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
