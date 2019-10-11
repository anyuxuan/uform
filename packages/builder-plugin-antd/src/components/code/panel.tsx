import React from 'react'
import classNames from 'classnames'
import { Container } from './style'

const CodePanel = ({ props, ctx }) => {
  const { schema, global } = ctx
  const { panelVisible } = global
  const { className, ...others } = props
  const wrapperCls = classNames(className, 'code-panel')

  return (
    <Container
      className={wrapperCls}
      {...others}
      visible={panelVisible.codePanel}
    >
      <div className="header">源码</div>
      <pre className="code-area">
        <code>{JSON.stringify(schema, null, 2)}</code>
      </pre>
    </Container>
  )
}

export default CodePanel
