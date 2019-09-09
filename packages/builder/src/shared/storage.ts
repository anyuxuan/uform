import { IFormState } from '@uform/types'

interface IConfigData {
  [key: string]: IFormState
}

// 存储配置面板中的表单数据
const CONFIG_DATA: IConfigData = {}

// 获取对应字段的配置项数据
export const getConfigData = (fieldName: string) => CONFIG_DATA[fieldName]

// 设置配置面板内表单的值
export const setConfigData = (fieldName: string, data: IFormState) => {
  if (!fieldName) {
    return
  }
  const previousData = getConfigData(fieldName)
  if (!previousData) {
    CONFIG_DATA[fieldName] = data
  } else {
    CONFIG_DATA[fieldName] = {
      ...previousData,
      ...data
    }
  }
}

// 删除对应字段的配置项数据
export const deleteConfigData = (fieldName: string) => {
  delete CONFIG_DATA[fieldName]
}
