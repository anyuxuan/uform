import React, { useCallback, useContext } from 'react'
import classNames from 'classnames'
import { getComponents, BuilderContext } from '../../shared'
import { Container } from './style'

const FieldPanel = props => {
  const { actions, global } = useContext(BuilderContext)
  const { panelVisibleMap } = global
  const { className, ...others } = props
  const componentsMap = getComponents()
  const wrapperCls = classNames('field-panel', className)

  const onClickItem = useCallback(
    fieldType => () => {
      actions.addField(fieldType)
    },
    []
  )

  return (
    <Container
      className={wrapperCls}
      {...others}
      visible={panelVisibleMap.fieldPanel}
    >
      <div className="header">组件</div>
      <div className="field-area">
        {Object.entries(componentsMap).map(([name, data]) => (
          <div
            key={name}
            className="field-item"
            onClick={onClickItem(data['x-component'])}
          >
            <img className="icon" src={data.icon} alt={name} />
            <div className="label">{data.label}</div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default FieldPanel
