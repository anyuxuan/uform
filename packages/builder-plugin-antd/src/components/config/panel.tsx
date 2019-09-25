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
  usePrevious,
  deepMapObj
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
              const currentFieldProps = actions.getCurrentFieldProps()
              const { name } = currentFieldProps.current
              if (name) {
                actions.setFieldState(name, fieldState => {
                  fieldState.value = value
                })
              }
            })
            $('onFieldChange', 'key').subscribe(fieldProps => {
              actions.alterField({})
            })
            $('onFieldChange', '*').subscribe(fieldProps => {
              // console.log(fieldProps, 'fieldProps')
            })
            $('onFieldChange', 'fields').subscribe(fieldProps => {
              // console.log(fieldProps, 'fields -> fieldProps')
              const { value } = fieldProps
              const currentFieldProps = actions.getCurrentFieldProps()
              const { uniqueId } = currentFieldProps.current
              const formSchema = actions.getSchema('')
              // console.log(formSchema, 'formSchema')
              const deletedIds = []
              deepMapObj(formSchema, data => {
                const { properties, uniqueId: innerId } = data
                // 找到当前选中的字段
                if (innerId === uniqueId && properties) {
                  if (Array.isArray(value)) {
                    Object.keys(properties).forEach(key => {
                      const index = key.split('.')[1]
                      if (!value[index]) {
                        deletedIds.push(properties[key].uniqueId)
                      }
                    })
                  }
                }
              })
              deletedIds.forEach(id => actions.deleteField(id))
            })
            $('onFieldChange', 'fields.*').subscribe(fieldProps => {
              const { name, value, path } = fieldProps
              if (!value) {
                return
              }
              // console.log(fieldProps, 'fields.* -> fieldProps')
              // TODO: 删除字段后，再添加会有问题
              // TODO: 先选择开关，再选择数组，就会报错
              const currentFieldProps = actions.getCurrentFieldProps()
              const { uniqueId } = currentFieldProps.current
              const formSchema = actions.getSchema('')
              const propertyKey = `${uniqueId}_${name}`
              const propertyList = []
              deepMapObj(formSchema, data => {
                const item = data[propertyKey]
                if (item && item['x-component'] === value) {
                  propertyList.push({
                    uniqueId,
                    property: {
                      [propertyKey]: item
                    }
                  })
                }
              })
              if (!propertyList.length) {
                actions.addFieldProperty({
                  [propertyKey]: {
                    ...getDefaultSchema(value),
                    'x-index': path[1],
                    uniqueId: uuid()
                  }
                })
              } else {
                propertyList.forEach(item => {
                  actions.addFieldProperty(item.property, item.uniqueId)
                })
              }
              actions.getFormState(formState => {
                // console.log(formState, 'formState')
              })
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
