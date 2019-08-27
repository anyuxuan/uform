import * as React from 'react'
import classNames from 'classnames'
import { Container } from './style'

const ConfigPanel = props => {
  const { className, ...others } = props
  const wrapperCls = classNames('config-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
    </Container>
  )
}

export default ConfigPanel
