import { result } from 'underscore'
import { Behavior } from 'backbone.marionette'

export default class PointerOnHover extends Behavior
  options:
    uiProperty: ''
    isClickable: true
    cursor: 'pointer'
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
        cursor: @getOption('cursor')
    return
