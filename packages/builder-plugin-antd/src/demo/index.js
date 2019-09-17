import React from 'react'
import {
  AsidePanelRenderer,
  FieldPanelRenderer,
  PreviewPanelRenderer,
  ConfigPanelRenderer,
  BasicLayout,
  BuilderContextProvider,
  createBuilderActions
} from '../../src'

import 'antd/dist/antd.min.css'

const actions = createBuilderActions()

const containerStyle = {
  position: 'absolute',
  top: 60,
  left: 0,
  right: 0,
  bottom: 0
}

class Demo extends React.Component {
  render() {
    return (
      <div className="demo-container" style={containerStyle}>
        <BuilderContextProvider actions={actions}>
          <BasicLayout>
            <AsidePanelRenderer />
            <FieldPanelRenderer />
            <PreviewPanelRenderer />
            <ConfigPanelRenderer />
          </BasicLayout>
        </BuilderContextProvider>
      </div>
    )
  }
}

export default Demo
