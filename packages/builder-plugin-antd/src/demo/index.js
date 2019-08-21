import React from 'react'
import {
  FieldPanel,
  PreviewPanel,
  ConfigPanel,
  BasicLayout,
  BuilderContext
} from '../../src'

import 'antd/dist/antd.min.css'

class Demo extends React.Component {
  render() {
    return (
      <div className="demo-container">
        <BuilderContext.Provider>
          <BasicLayout>
            <FieldPanel />
            <PreviewPanel />
            <ConfigPanel />
          </BasicLayout>
        </BuilderContext.Provider>
      </div>
    )
  }
}

export default Demo
