import * as React from 'react'

type RecursiveCallback = <T extends React.ReactElement>(child: T) => T

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
