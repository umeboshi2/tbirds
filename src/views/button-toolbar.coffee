Marionette = require 'backbone.marionette'
tc = require 'teacup'

navigate_to_url = require '../util/navigate-to-url'

class ToolbarEntryView extends Marionette.View
  attributes:
    'class': 'btn btn-default'
  template: tc.renderable (model) ->
    tc.i model.icon, model.label
  triggers:
    # we capture every click within the view
    # we don't need ui hash
    # https://gitter.im/marionettejs/backbone.marionette?at=59514dd876a757f808aa504f # noqa
    click: 'button:clicked'
  buttonClicked: (event) ->

class ToolbarEntryCollectionView extends Marionette.CollectionView
  childView: ToolbarEntryView
  className: 'btn-group btn-group-justified'
  onChildviewButtonClicked: (child) ->
    @trigger 'toolbar:entry:clicked', child
    
class ToolbarView extends Marionette.View
  template: tc.renderable () ->
    tc.div '.toolbar-entries'
  regions:
    entries:
      el: '.toolbar-entries'
      #replaceElement: true
  onRender: ->
    view = new ToolbarEntryCollectionView
      collection: @collection
    @showChildView 'entries', view
  onChildviewToolbarEntryClicked: (child) ->
    navigate_to_url child.model.get 'url'
    
    
module.exports = ToolbarView

