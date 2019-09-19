import React, { cloneElement, isValidElement } from 'react'

type RecursiveCallback = (child: React.ReactNode) => any

export const recursiveReactElement = (
  element: React.ReactNode | React.ReactNode[],
  callback: RecursiveCallback
) => {
  return React.Children.map<any, React.ReactNode>(element, child => {
    if (!isValidElement(child)) {
      return child
    }
    if (child.props && child.props.children) {
      child = cloneElement(child, {
        ...child.props,
        children: recursiveReactElement(child.props.children, callback)
      })
    }
    return callback(child)
  })
}
