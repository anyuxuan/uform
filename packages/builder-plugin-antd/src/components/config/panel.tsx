import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import uuid from 'uuid'
import { isEmpty, isFn } from '@uform/utils'
import { SchemaForm, createFormActions } from '@uform/antd'
import {
  connectProps,
  getComponent,
  getConfigData,
  deleteConfigData,
  getDefaultSchema,
  setConfigData,
  usePrevious,
  deepMapObj,
  isPlainObj
} from '@uform/builder'
import { Container } from './style'

const formActions = createFormActions()

const ConfigPanel = ({ props, ctx }) => {
  const { className, ...others } = props
  const { global, api } = ctx
  const { currentFieldType, currentUniqueId } = global
  const { actions } = api
  const prevUniqueId = usePrevious(currentUniqueId)

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
      // 用来标识该Field是配置面板中的Field
      __target__: 'configPanel'
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
  if ((prevUniqueId || currentUniqueId) && prevUniqueId !== currentUniqueId) {
    formActions.getFormState(prevFormState => {
      if (!prevUniqueId && currentUniqueId) {
        setConfigData(currentUniqueId, getInitialValues())
      } else {
        // 存储上一个字段的配置项数据
        setConfigData(prevUniqueId, prevFormState.values)
      }
      // 设置当前选中字段的配置项数据
      formActions.setFormState(formState => {
        const configData = getConfigData(currentUniqueId)
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

            $('onFieldChange', 'cardTitle').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({
                'x-props': {
                  title: value
                }
              })
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

            $('onFieldChange', 'description').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ description: value })
            })

            $('onFieldChange', 'key').subscribe(fieldProps => {
              actions.alterField({})
            })

            $('onFieldChange', 'maxItems').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ maxItems: value })
            })

            $('onFieldChange', 'minItems').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ minItems: value })
            })

            $('onFieldChange', 'required').subscribe(fieldProps => {
              const { value } = fieldProps
              actions.alterField({ required: value })
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
                if (!isPlainObj(data)) {
                  return
                }
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
              deletedIds.forEach(id => {
                actions.deleteField(id)
                deleteConfigData(id)
              })
            })

            $('onFieldChange', 'fields.*').subscribe(fieldProps => {
              const { name, value, path } = fieldProps
              if (isEmpty(value)) {
                return
              }
              // console.log(fieldProps, 'fields.* -> fieldProps')
              // TODO: 先选择开关，再选择数组，就会报错
              const currentFieldProps = actions.getCurrentFieldProps()
              const { uniqueId } = currentFieldProps.current
              const propertyKey = `${uniqueId}_${name}`
              const fieldState = actions.getFieldState(propertyKey)
              if (
                isEmpty(fieldState) ||
                (fieldState && fieldState.props['x-component'] !== value)
              ) {
                const defaultProperty = {
                  ...getDefaultSchema(value),
                  'x-index': path[1],
                  uniqueId: uuid()
                }
                actions.setFieldState(propertyKey, fieldState => {
                  if (isEmpty(fieldState.props)) {
                    return
                  }
                  fieldState.props = defaultProperty
                })
                actions.addFieldProperty({
                  [propertyKey]: defaultProperty
                })
              } else {
                actions.addFieldProperty(
                  { [propertyKey]: fieldState.props },
                  uniqueId
                )
              }
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
