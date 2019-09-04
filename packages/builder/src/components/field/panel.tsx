import * as React from 'react'
import classNames from 'classnames'
import { getComponents, BuilderContext } from '../../shared'
import { Container } from './style'

const FieldPanel = props => {
  const { actions } = React.useContext(BuilderContext)
  const { className, ...others } = props
  const componentsMap = getComponents()
  const wrapperCls = classNames('field-panel', className)

  const onClickItem = React.useCallback(fieldType => {
    actions.addField(fieldType)
    actions.clickField(fieldType)
  }, [])

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">组件</div>
      <div className="field-area">
        {Object.entries(componentsMap).map(([name, data]) => (
          <div
            key={name}
            className="field-item"
            onClick={() => onClickItem(data['x-component'])}
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
