import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import uuid from 'uuid'
import { isEmpty, isFn } from '@uform/utils'
import { SchemaForm, createFormActions } from '@uform/antd'
import {
  connectProps,
  getComponent,
  getConfigData,
  getDefaultSchema,
  setConfigData,
  usePrevious
} from '@uform/builder'
import { Container } from './style'

const formActions = createFormActions()

const ConfigPanel = ({ props, ctx }) => {
  const { className, ...others } = props
  const { global, api } = ctx
  const { currentFieldType, currentFieldName } = global
  const { actions } = api
  const prevFieldName = usePrevious(currentFieldName)

  const wrapperCls = classNames(className, 'config-panel')

  const ConfigField = useMemo(() => {
    const component = getComponent(currentFieldType)
    if (!component || !component.renderer) {
      return null
    }
    const element = component.renderer({
      actions: formActions,
      ctx
    })
    return connectProps({
      'x-props': {
        // 用来标识该Field是配置面板中的Field
        target: 'configPanel'
      }
    })(element)
  }, [ctx, currentFieldType])

  const getInitialValues = useCallback(() => {
    const component = getComponent(currentFieldType)
    if (component && isFn(component.getDefaultValue)) {
      return component.getDefaultValue()
    }
    return {}
  }, [currentFieldType])

  // 在预览区域点击不同的字段时，配置区域显示对应的配置项及数据
  if (
    (prevFieldName || currentFieldName) &&
    prevFieldName !== currentFieldName
  ) {
    formActions.getFormState(prevFormState => {
      if (!prevFieldName && currentFieldName) {
        setConfigData(currentFieldName, getInitialValues())
      } else {
        // 存储上一个字段的配置项数据
        setConfigData(prevFieldName, prevFormState.values)
      }
      // 设置当前选中字段的配置项数据
      formActions.setFormState(formState => {
        const configData = getConfigData(currentFieldName)
        formState.values = !isEmpty(configData)
          ? configData
          : getInitialValues()
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
            $('onFieldChange', 'title').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ title: value })
            })
            $('onFieldChange', 'default').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ default: value })
            })
            $('onFieldChange', 'key').subscribe(fieldProps => {
              actions.alterField({})
            })
            $('onFieldChange', 'fields').subscribe(fieldProps => {
              // console.log(fieldProps, 'fieldProps')
            })
            $('onFieldChange', 'fields.*').subscribe(fieldProps => {
              const { name, value, path } = fieldProps
              if (!value) {
                return
              }
              // TODO: 删除字段，无法实时在预览区域展现
              // TODO: 先选择开关，再选择数组，就会报错
              // TODO: 新增加一个字段后，之前的字段变成了默认值
              // console.log(fieldProps, 'aaaa')
              const currentFieldProps = actions.getCurrentFieldProps()
              const { uniqueId } = currentFieldProps.current
              const property = {
                [`${uniqueId}_${name}`]: {
                  ...getDefaultSchema(value),
                  'x-index': path[1],
                  uniqueId: uuid()
                }
              }
              actions.addFieldProperty(property)
              actions.addFieldProperty()
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
