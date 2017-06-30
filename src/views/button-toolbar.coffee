Marionette = require 'backbone.marionette'
tc = require 'teacup'

navigate_to_url = require '../util/navigate-to-url'

default_entry_template = tc.renderable (model) ->
  tc.i model.icon
  tc.text " "
  tc.text model.label
  
class ToolbarEntryView extends Marionette.View
  tagName: 'button'
  attributes:
    'class': 'btn btn-secondary'
  triggers:
    # we capture every click within the view
    # we don't need ui hash
    # https://gitter.im/marionettejs/backbone.marionette?at=59514dd876a757f808aa504f # noqa
    click: 'button:clicked'
  buttonClicked: (event) ->

class ToolbarEntryCollectionView extends Marionette.CollectionView
  childView: ToolbarEntryView
  childViewOptions: ->
    template: @options.entryTemplate
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
    entryTemplate = @options.entryTemplate or default_entry_template
    view = new ToolbarEntryCollectionView
      collection: @collection
      entryTemplate: entryTemplate
    @showChildView 'entries', view
  onChildviewToolbarEntryClicked: (child) ->
    navigate_to_url child.model.get 'url'
    
    
module.exports = ToolbarView

