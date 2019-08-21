import * as React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { getComponents } from '../../shared'

const Container = styled.div`
  &.field-panel {
    width: 300px;
    min-height: 100vh;
    position: fixed;
    left: 48px;
    border-right: 1px solid rgba(31, 56, 88, 0.1);
    background: #ffffff;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      color: rgba(0, 0, 0, 0.8);
      background: rgba(31, 56, 88, 0.04);
    }

    .field-area {
      display: flex;
      justify-content: space-between;
      padding: 10px;

      .field-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: grab;
        width: 80px;

        .icon {
          width: 24px;
          height: 24px;
          margin-bottom: 10px;
        }

        .label {
          color: rgba(0, 0, 0, 0.6);
          font-size: 12px;
        }
      }
    }
  }
`

const FieldPanel = props => {
  const { className, ...others } = props
  const componentsMap = getComponents()
  const wrapperCls = classNames('field-panel', className)

  return (
    <Container className={wrapperCls} {...others}>
      <div className="title">组件</div>
      <div className="field-area">
        {Object.entries(componentsMap).map(([name, data]) => (
          <div key={name} className="field-item">
            <img className="icon" src={data.icon} alt={name} />
            <div className="label">{data.label}</div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default FieldPanel
