import React from 'react'

type RecursiveCallback = (child: React.ReactElement) => any

export const recursiveReactElement = (
  element: React.ReactElement,
  callback: RecursiveCallback
) => {
  return React.Children.map(element, child => {
    if (child.props.children && Array.isArray(child.props.children)) {
      return recursiveReactElement(child.props.children, callback)
    }
    return callback(child)
  })
}
