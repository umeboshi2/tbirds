import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

class ProgressModel extends Backbone.Model
  defaults:
    valuemin: 0
    valuemax: 100
    valuenow: 0

class ProgressBar extends View
  className: ->
    return @getOption('className') or 'progress-bar progress-bar-striped'
  attributes: ->
    role: 'progressbar'
    style: "width: #{@getWidth()}%;"
  template: tc.renderable (model) ->
    tc.span style:model.textStyle,
      tc.text model.textLabel
  templateContext: ->
    current = @model.get('valuenow')
    max = @model.get('valuemax')
    label = "#{current} of #{max}"
    return
      textStyle: @getOption('textStyle') or 'color:black;'
      textLabel: @getOption('textLabel') or label
  getWidth: ->
    # width is a percentage
    current = @model.get('valuenow')
    max = @model.get('valuemax')
    return Math.floor current / max * 100 + 0.5
  modelEvents:
    'change': 'render'
  onRender: ->
    @$el.css
      width: "#{@getWidth()}%"
      
class ProgressView extends View
  className: 'progress'
  createModel: (options) ->
    return new ProgressModel options
  template: tc.renderable (model) ->
    wrapperClasses = ".pb-wrapper"
    if model.wrapperClasses
      wrapperClasses = ".pb-wrapper.#{model.wrapperClasses}"
    tc.div wrapperClasses
  templateContext: ->
    wrapperClasses: @getOption('wrapperClasses') or '.pb-wrapper'
  ui:
    pbWrapper: '.pb-wrapper'
  regions:
    pbWrapper: '@ui.pbWrapper'
  onRender: ->
    viewOptions = @getOption('childViewOptions') or {}
    viewOptions.model = @model
    view = new ProgressBar viewOptions
    @showChildView 'pbWrapper', view
    
    
export {
  ProgressModel
  ProgressView
  }
