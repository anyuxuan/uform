import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

const Container = styled.div`
  &.config-panel {
    width: 280px;
    background: #ffffff;
    border-left: 1px solid rgba(31, 56, 88, 0.1);
  }
`

const ConfigPanel = props => {
  const { className, ...others } = props
  const wrapperCls = classNames('config-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      配置区
    </Container>
  )
}

export default ConfigPanel
