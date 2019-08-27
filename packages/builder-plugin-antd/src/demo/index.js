import React from 'react'
import {
  FieldPanel,
  PreviewPanel,
  ConfigPanel,
  BasicLayout,
  BuilderContextProvider,
  createBuilderActions
} from '../../src'

import 'antd/dist/antd.min.css'

const actions = createBuilderActions()

class Demo extends React.Component {
  render() {
    return (
      <div className="demo-container">
        <BuilderContextProvider actions={actions}>
          <BasicLayout>
            <FieldPanel />
            <PreviewPanel />
            <ConfigPanel />
          </BasicLayout>
        </BuilderContextProvider>
      </div>
    )
  }
}

export default Demo
