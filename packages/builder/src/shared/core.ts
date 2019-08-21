interface FieldData {
  label: string
  icon: string
  type: string
  ['x-component']: string
}

interface FieldMap {
  [k: string]: FieldData
}

const FIELDS_MAP: FieldMap = {}
const CONFIG_MAP = {}

// 注册组件，注册过的组件会展示在组件面板中
export const registerComponent = (name: string, data: FieldData): void => {
  if (!name) {
    return
  }
  FIELDS_MAP[name] = data
}

export const getComponent = (name: string): FieldData | undefined => {
  return FIELDS_MAP[name]
}

export const getComponents = (): FieldMap => FIELDS_MAP

// 注册组件的配置项
// TODO: 确定配置项参数
export const registerConfig = (name: string, config: any): void => {
  if (!name) {
    return
  }
  CONFIG_MAP[name] = config
}

export const getConfig = (name: string): any => {
  return CONFIG_MAP[name]
}
