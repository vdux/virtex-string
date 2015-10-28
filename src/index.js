/**
 * Imports
 */

import {actions} from 'virtex'

/**
 * Actions
 */

const {CREATE_TEXT_NODE, CREATE_ELEMENT} = actions.types

/**
 * Virtex string
 */

function string ({dispatch}) {
  return next => action => {
    switch (action.type) {
      case CREATE_TEXT_NODE
        return action.text
      case CREATE_ELEMENT
        return '<' + action.tag + renderAttrs(action.attrs) + '>'
          + action.children.map(renderChild).join('')
          + '</' + action.tag + '>'
    }
  }

  function renderChild (child) {
    return typeof child.text !== 'undefined'
      ? dispatch(createTextNode(child))
      : dispatch(createElement(child))
  }

  function renderAttrs (attrs) {
    if (!attrs) return ''

    return ' ' + Object
      .keys(attrs)
      .map(key => key + '=' + attrs[key])
      .join(' ')
  }
}

/**
 * Exports
 */

export default string
