/**
 * Imports
 */

import ent from 'ent'
import has from '@f/has'
import {actions} from 'virtex'
import reduce from '@f/reduce-array'
import selfClosing from '@f/self-closing-tags'
import stringifyAttrs from '@f/stringify-attrs'

/**
 * Actions
 */

const {CREATE_NODE, UPDATE_NODE} = actions.types

/**
 * Skippable attributes
 */

var skipAttrs = {
  innerHTML: true,
  textContent: true,
  nodeValue: true
}

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
  if (attrs && has('innerHTML', attrs) && !contents) {
    contents = attrs.innerHTML
  }

  const attrStr = stringifyAttrs(attrs, skipAttrs)

  return selfClosing.index[tag] && !contents
    ? `<${tag}${attrStr} />`
    : `<${tag}${attrStr}>${contents}</${tag}>`
}

/**
 * Exports
 */

export default string
