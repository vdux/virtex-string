/**
 * Imports
 */

import {actions} from 'virtex'

/**
 * Actions
 */

const {CREATE_ELEMENT} = actions.types

/**
 * Virtex string
 */

function string ({dispatch}) {
  return next => action => {
    if (action.type === CREATE_ELEMENT) {
      const {type, attrs, children} = action.vnode
      return type === '#text'
        ? attrs.nodeValue
        : `<${type}${renderAttrs(attrs)}>${children.map(c => c.el).join('')}</${type}>`
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
