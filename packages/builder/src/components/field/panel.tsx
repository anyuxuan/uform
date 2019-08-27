import * as React from 'react'
import classNames from 'classnames'
import { getComponents } from '../../shared'
import { BuilderContext } from '../../shared'
import { Container } from './style'

const FieldPanel = props => {
  const context = React.useContext(BuilderContext)
  const { actions } = context
  const { className, ...others } = props
  const componentsMap = getComponents()
  const wrapperCls = classNames('field-panel', className)

  const onClickItem = () => {
    // console.log(context)
    actions.addField()
  }

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">组件</div>
      <div className="field-area">
        {Object.entries(componentsMap).map(([name, data]) => (
          <div key={name} className="field-item" onClick={onClickItem}>
            <img className="icon" src={data.icon} alt={name} />
            <div className="label">{data.label}</div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default FieldPanel
