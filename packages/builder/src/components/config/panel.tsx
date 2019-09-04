import * as React from 'react'
import classNames from 'classnames'
import { SchemaForm } from '@uform/react'
import { Container } from './style'
import { BuilderContext, getConfig } from '../../shared'

const ConfigPanel = props => {
  const { className, ...others } = props
  const { actions, effects, global } = React.useContext(BuilderContext)
  const { currentField } = global
  const wrapperCls = classNames('config-panel', className)

  const ConfigField = React.useMemo(() => {
    const renderer = getConfig(currentField)
    if (!renderer) {
      return null
    }
    return renderer({ actions })
  }, [currentField])

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
      <SchemaForm actions={actions} effects={effects}>
        {ConfigField}
      </SchemaForm>
    </Container>
  )
}

export default ConfigPanel
