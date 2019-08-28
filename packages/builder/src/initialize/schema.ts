import { registerDefaultSchema } from '../shared'

registerDefaultSchema('array', {
  type: 'array',
  title: '数组',
  items: {
    type: 'object',
    properties: {
      item1: {
        type: 'string',
        title: '字段1'
      }
    }
  }
})

registerDefaultSchema('boolean', {
  type: 'boolean',
  title: '单选框'
})

registerDefaultSchema('checkbox', {
  type: 'checkbox',
  title: '多选框',
  enum: [
    {
      label: '选项一',
      value: 1
    },
    {
      label: '选项二',
      value: 2
    },
    {
      label: '选项三',
      value: 3
    }
  ]
})
