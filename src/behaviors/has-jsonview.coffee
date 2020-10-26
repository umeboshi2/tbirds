import { Behavior } from 'backbone.marionette'
import JView from 'json-view'

class HasJsonView extends Behavior
  options: ->
    jviewSelector: '.jsonview'
  ui: ->
    jsonView: @getOption 'jviewSelector'
  onDomRefresh: ->
    obj = @view.model.toJSON()
    @view.jsonView = new JView obj
    @ui.jsonView.prepend @view.jsonView.dom

export default HasJsonView
