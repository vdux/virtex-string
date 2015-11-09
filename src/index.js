/**
 * Imports
 */

import {actions} from 'virtex'

/**
 * Actions
 */

const {CREATE_TEXT_NODE, CREATE_ELEMENT} = actions.types
const {createElement, createTextNode} = actions

/**
 * Virtex string
 */

function string ({dispatch}) {
  return next => action => {
    switch (action.type) {
      case CREATE_TEXT_NODE:
        return action.text
      case CREATE_ELEMENT:
        const {tag, attrs, children} = action.vnode
        return `<${tag}${renderAttrs(attrs)}>${children.map(c => c.el).join('')}</${tag}>`
    }

    return next(action)
  }

  function renderAttrs (attrs) {
    if (!attrs) return ''

    let str = ''

    for (let key in attrs) {
      const val = attrs[key]

      if (isValidAttr(val)) {
        str += ` ${key}="${val}"`
      }
    }

    return str
  }

  function isValidAttr (val) {
    switch (typeof val) {
      case 'string':
      case 'number':
        return true
      case 'boolean':
        return val
      default:
        return false
    }
  }
}

/**
 * Exports
 */

export default string
