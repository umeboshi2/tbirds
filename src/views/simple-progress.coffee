import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

class ProgressModel extends Backbone.Model
  defaults:
    valuemin: 0
    valuemax: 100
    valuenow: 0

class ProgressView extends View
  template: tc.renderable (model) ->
    tc.div '.progress', ->
      aria =
        valuemin: model.valuemin
        valuemax: model.valuemax
        valuenow: model.valuenow
      width = Math.floor model.valuenow / model.valuemax * 100 + 0.5
      tc.div '.progress-bar.progress-bar-striped',
      role:'progressbar',
      style:"width: #{width}%", ->
        tc.span style:"color:black;",
        "#{model.valuenow} of #{model.valuemax}."
  modelEvents:
    'change': 'render'
    
    
export {
  ProgressModel
  ProgressView
  }
