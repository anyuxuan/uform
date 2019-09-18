import React, { isValidElement } from 'react'

type RecursiveCallback = (child: React.ReactElement) => any

export const recursiveReactElement = (
  element: React.ReactElement | React.ReactElement[],
  callback: RecursiveCallback
) => {
  return React.Children.map<any, React.ReactElement>(element, child => {
    if (child.props.children) {
      const { children } = child.props
      if (!isValidElement(children)) {
        return null
      }
      if (Array.isArray(children)) {
        return recursiveReactElement(children, callback)
      } else {
        return callback(children)
      }
    }
    return callback(child)
  })
}
