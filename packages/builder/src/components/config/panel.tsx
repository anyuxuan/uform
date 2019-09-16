import React, { useMemo, useContext } from 'react'
import classNames from 'classnames'
import { SchemaForm, createFormActions } from '@uform/react'
import { Container } from './style'
import {
  BuilderContext,
  connectProps,
  getConfig,
  getConfigData,
  setConfigData
} from '../../shared'
import { usePrevious } from '../../hooks'

const formActions = createFormActions()

const ConfigPanel = props => {
  const { className, ...others } = props
  const { api, global } = useContext(BuilderContext)
  const { actions } = api
  const { currentFieldType, currentFieldName } = global
  const prevFieldName = usePrevious(currentFieldName)

  const wrapperCls = classNames('config-panel', className)

  const ConfigField = useMemo(() => {
    const renderer = getConfig(currentFieldType)
    if (!renderer) {
      return null
    }
    const element = renderer({ actions: formActions })
    return connectProps({
      'x-props': {
        // 用来标识该Field是配置面板中的Field
        from: 'config'
      }
    })(element)
  }, [currentFieldType])

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
