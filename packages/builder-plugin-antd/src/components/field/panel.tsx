import React, { useMemo, useCallback, useContext } from 'react'
import classNames from 'classnames'
import { BuilderContext, getComponents } from '@uform/builder'
import { Container } from './style'

const FieldPanel = ({ props, visible }) => {
  const { api } = useContext(BuilderContext)
  const { actions } = api
  const { className, ...others } = props
  const wrapperCls = classNames(className, 'field-panel')

  const components = useMemo(() => getComponents(), [getComponents])

  const onClickItem = useCallback(
    fieldType => () => {
      actions.addField(fieldType)
    },
    []
  )

  return (
    <Container className={wrapperCls} {...others} visible={visible}>
      <div className="header">组件</div>
      <div className="field-area">
        {Object.entries(components).map(([name, data]) => {
          const { meta } = data
          return (
            <div
              key={name}
              className="field-item"
              onClick={onClickItem(meta['x-component'])}
            >
              <img className="icon" src={meta.icon} alt={name} />
              <div className="label">{meta.label}</div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default FieldPanel
