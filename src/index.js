/**
 * Imports
 */

import {actions} from 'virtex'
import stringifyAttrs from '@f/stringify-attrs'

/**
 * Actions
 */

const {CREATE_NODE} = actions.types

/**
 * Virtex string
 */

function string () {
  return next => action => {
    if (action.type === CREATE_NODE) {
      const {vnode, children} = action
      vnode.element = render(vnode, children)
      return vnode
    }

    return next(action)
  }
}

function render ({type, props}, children) {
  return type === '#text'
    ? props.nodeValue
    : stringifyElement(type, props, children.reduce((acc, child) => acc + child.element, ''))
}

function stringifyElement (tag, attrs, contents) {
  return `<${tag}${stringifyAttrs(attrs)}>${contents}</${tag}>`
}

/**
 * Exports
 */

export default string
