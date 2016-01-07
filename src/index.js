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
      action.vnode.element = render(action.vnode)
      return
    }

    return next(action)
  }

  function render ({type, props, children}) {
    return type === '#text'
      ? props.nodeValue
      : `<${type}${stringifyAttrs(props)}>${children.map(c => c.element).join('')}</${type}>`
  }

  function stringifyAttrs (attrs) {
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
