import * as React from 'react'
import classNames from 'classnames'
import { BuilderContext } from '../../shared'
import { Container } from './style'

const ASIDE_CONFIG = [
  {
    type: 'fieldPanel',
    icon: 'https://img.alicdn.com/tfs/TB1yp7qe1T2gK0jSZFvXXXnFXXa-32-32.svg',
    desc: '组件库'
  },
  {
    type: 'codePanel',
    icon: 'https://img.alicdn.com/tfs/TB1rtQweYj1gK0jSZFOXXc7GpXa-32-32.svg',
    desc: '源码'
  }
]

const Aside = props => {
  const { className, ...others } = props
  const { actions } = React.useContext(BuilderContext)
  const wrapperCls = classNames('aside', className)

  const setPanelVisible = React.useCallback(
    type => {
      actions.dispatch('onSetPanelVisible', type)
    },
    [actions]
  )

  return (
    <Container className={wrapperCls} {...others}>
      {ASIDE_CONFIG.map(item => (
        <div
          key={item.type}
          className="aside-item"
          onClick={() => setPanelVisible(item.type)}
        >
          <img className="icon" src={item.icon} alt={item.desc} />
        </div>
      ))}
    </Container>
  )
}

export default Aside