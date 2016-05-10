/**
 * Imports
 */

import ent from 'ent'
import {actions} from 'virtex'
import reduce from '@f/reduce-array'
import stringifyAttrs from '@f/stringify-attrs'
import selfClosing from '@f/self-closing-tags'

/**
 * Actions
 */

const {CREATE_NODE, UPDATE_NODE} = actions.types

/**
 * Virtex string
 */

function string () {
  return next => action => {
    if (action.type === CREATE_NODE || action.type === UPDATE_NODE) {
      const {vnode, children} = action
      vnode.element = render(vnode, children)
      return vnode
    }

    return next(action)
  }
}

function render ({type, props}, children) {
  return type === '#text'
    ? ent.encode(String(props.nodeValue))
    : stringifyElement(type, props, reduce((acc, child) => acc + child.element, '', children))
}

function stringifyElement (tag, attrs, contents) {
  return selfClosing.index[tag] && !contents
    ? `<${tag}${stringifyAttrs(attrs)} />`
    : `<${tag}${stringifyAttrs(attrs)}>${contents}</${tag}>`
}

/**
 * Exports
 */

export default string
