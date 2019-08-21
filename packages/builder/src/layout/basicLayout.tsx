import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

const Container = styled.div`
  &.basic-layout {
    display: flex;
  }
`

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
