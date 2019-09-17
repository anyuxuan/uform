import React, { useMemo } from 'react'
import classNames from 'classnames'
import { SchemaForm, createFormActions } from '@uform/antd'
import {
  connectProps,
  getComponent,
  getConfigData,
  setConfigData,
  usePrevious
} from '@uform/builder'
import { Container } from './style'

const formActions = createFormActions()

const ConfigPanel = ({ props, ctx }) => {
  const { className, ...others } = props
  const { api, global } = ctx
  const { actions } = api
  const { currentFieldType, currentFieldName } = global
  const prevFieldName = usePrevious(currentFieldName)

  const wrapperCls = classNames(className, 'config-panel')

  const ConfigField = useMemo(() => {
    const component = getComponent(currentFieldType)
    if (!component || !component.renderer) {
      return null
    }
    const element = component.renderer({ actions: formActions })
    return connectProps({
      'x-props': {
        // 用来标识该Field是配置面板中的Field
        // TODO: 换一个字段名
        from: 'config'
      }
    })(element)
  }, [currentFieldType, getComponent, connectProps])

  // 在预览区域点击不同的字段时，配置区域显示对应的配置项及数据
  if (prevFieldName && prevFieldName !== currentFieldName) {
    formActions.getFormState(currentFormState => {
      setConfigData(prevFieldName, currentFormState.values)
      formActions.setFormState(formState => {
        formState.values = getConfigData(currentFieldName) || {}
      })
    })
  }

  return (
    <Container className={wrapperCls} {...others}>
      <div className="header">配置区</div>
      <div className="container">
        <SchemaForm
          actions={formActions}
          effects={$ => {
            // 监听配置面板中字段值的变化，触发修改预览区域字段schema的action
            $('onAlterPreviewField').subscribe(({ payload }) => {
              actions.alterField(payload)
            })
          }}
        >
          {ConfigField}
        </SchemaForm>
      </div>
    </Container>
  )
}

export default ConfigPanel
