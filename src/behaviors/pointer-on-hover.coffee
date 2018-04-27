import { result } from 'underscore'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

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
    console.log "handleHover", @options.isClickable, @options
    console.log "isClickable", @getOption('isClickable')
    if result @options, 'isClickable'
      uiProperty = @getOption('uiProperty')
      if uiProperty
        el = @ui[uiProperty]
      else
        el = @$el
      el.css
        cursor: 'pointer'
