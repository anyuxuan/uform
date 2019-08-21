import React from 'react'
import { FieldPanel, PreviewPanel, ConfigPanel, BasicLayout } from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <div className="demo-container">
        <BasicLayout>
          <FieldPanel />
          <PreviewPanel />
          <ConfigPanel />
        </BasicLayout>
      </div>
    )
  }
}

export default Demo
