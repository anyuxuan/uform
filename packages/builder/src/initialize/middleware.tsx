import * as React from 'react'
import { registerFieldMiddleware } from '@uform/react'
import { BuilderContext } from '../shared'

registerFieldMiddleware(Field => {
  return props => {
    const { actions } = React.useContext(BuilderContext)
    const { name, schema } = props
    if (!name) {
      return <Field {...props} />
    }
    const onClick = React.useCallback(() => {
      if (schema['x-props'] && schema['x-props'].from === 'config') {
        return
      }
      actions.dispatch('onClickField', {
        name,
        type: schema['x-component'] || schema.type
      })
    }, [actions])
    return (
      <div onClick={onClick}>
        <Field {...props} />
      </div>
    )
  }
})
