import * as React from 'react'
import classNames from 'classnames'
import { Container } from './style'
import { BuilderContext } from '../../shared'

const ConfigPanel = props => {
  const { className, ...others } = props
  const { actions, global } = React.useContext(BuilderContext)
  const { currentField } = global
  const wrapperCls = classNames('config-panel', className)

  const deleteSchema = React.useCallback(() => {
    actions.deleteField(currentField)
  }, [])

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
      <div onClick={deleteSchema}>删除</div>
    </Container>
  )
}

export default ConfigPanel
