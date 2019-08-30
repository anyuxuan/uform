import * as React from 'react'
import classNames from 'classnames'
import { Container } from './style'
import { BuilderContext } from '../../shared'

const ConfigPanel = props => {
  const { className, ...others } = props
  const { actions } = React.useContext(BuilderContext)
  const wrapperCls = classNames('config-panel', className)

  const deleteSchema = React.useCallback(() => {
    actions.dispatch('onDeleteField', 'checkbox_0')
  }, [])

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
      <div onClick={deleteSchema}>删除</div>
    </Container>
  )
}

export default ConfigPanel
