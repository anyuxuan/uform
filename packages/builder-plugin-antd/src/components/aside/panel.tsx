import React, { useCallback } from 'react'
import classNames from 'classnames'
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

const AsidePanel = ({ props, ctx }) => {
  const { className, ...others } = props
  const { api } = ctx
  const { actions } = api
  const wrapperCls = classNames(className, 'aside')

  const setPanelVisible = useCallback(
    type => () => {
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
          onClick={setPanelVisible(item.type)}
        >
          <img className="icon" src={item.icon} alt={item.desc} />
        </div>
      ))}
    </Container>
  )
}

export default AsidePanel
