import * as React from 'react'
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
import { useEffect } from 'react'

const formActions = createFormActions()

const ConfigPanel = props => {
  const { className, ...others } = props
  const { actions, global } = React.useContext(BuilderContext)
  const { currentFieldType, currentFieldName } = global
  // 在预览区点击不同字段的时候，用来记录上一个点击的字段名
  const prevFieldNameRef = React.useRef(currentFieldName)

  const wrapperCls = classNames('config-panel', className)

  const ConfigField = React.useMemo(() => {
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

  useEffect(() => {
    if (
      prevFieldNameRef.current &&
      prevFieldNameRef.current !== currentFieldName
    ) {
      formActions.getFormState(currentFormState => {
        setConfigData(prevFieldNameRef.current, currentFormState.values)
        formActions.setFormState(formState => {
          formState.values = getConfigData(currentFieldName) || {}
        })
      })
    }
    prevFieldNameRef.current = currentFieldName
  }, [prevFieldNameRef, currentFieldName])

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
