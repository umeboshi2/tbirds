import { result } from 'underscore'
import Marionette from 'backbone.marionette'

export default class PointerOnHover extends Marionette.Behavior
  options:
    uiProperty: ''
    isClickable: 'hello'
  events: ->
    key = 'mouseenter'
    uiProperty = @getOption 'uiProperty'
    if uiProperty
      key = "mouseenter @ui.#{uiProperty}"
    data = {}
    data[key] = 'handleHover'
    return data
    
  handleHover: ->
    if result @options, 'isClickable'
      uiProperty = @getOption('uiProperty')
      if uiProperty
        el = @ui[uiProperty]
      else
        el = @$el
      el.css
        cursor: 'pointer'