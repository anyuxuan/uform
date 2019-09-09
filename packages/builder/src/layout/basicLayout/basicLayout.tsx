import React from 'react'
import classNames from 'classnames'
import { Container } from './style'

const BasicLayout = props => {
  const { className, children, ...others } = props
  const wrapperCls = classNames('basic-layout', className)
  return (
    <Container className={wrapperCls} {...others}>
      {children}
    </Container>
  )
}

export default BasicLayout
