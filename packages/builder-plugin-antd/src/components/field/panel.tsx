import React, { useMemo, useCallback } from 'react'
import classNames from 'classnames'
import { getComponents, IComponentData } from '@uform/builder'
import { Container } from './style'

const FieldPanel = ({ props, ctx }) => {
  const { api, global } = ctx
  const { actions } = api
  const { panelVisible } = global
  const { className, ...others } = props
  const wrapperCls = classNames(className, 'field-panel')

  const components = useMemo(() => getComponents(), [])

  const onClickItem = useCallback(
    fieldType => () => {
      actions.addField(fieldType)
    },
    [actions]
  )

  return (
    <Container
      className={wrapperCls}
      {...others}
      visible={panelVisible.fieldPanel}
    >
      <div className="header">组件</div>
      <div className="field-area">
        {Object.entries(components).map(([name, data]) => {
          const { meta } = data as IComponentData
          return (
            <div
              key={name}
              className="field-item"
              onClick={onClickItem(meta['x-component'] || meta.type)}
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
