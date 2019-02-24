import Marionette from 'backbone.marionette'
import tc from 'teacup'

import navigate_to_url from '../util/navigate-to-url'

defaultEntryTemplate = tc.renderable (model) ->
  tc.i model.icon
  tc.text " "
  tc.text model.label
  
defaultButtonClassName = "btn btn-outline-primary"

class ToolbarEntryView extends Marionette.View
  tagName: 'button'
  className: ->
    name = @model.get 'buttonClassName'
    if not name
      name = @getOption('buttonClassName') or defaultButtonClassName
    return name
  triggers:
    # we capture every click within the view
    # we don't need ui hash
    # https://gitter.im/marionettejs/backbone.marionette?at=59514dd876a757f808aa504f # noqa
    click: 'button:clicked'
  modelEvents:
    change: 'render'
    
class ToolbarEntryCollectionView extends Marionette.CollectionView
  childView: ToolbarEntryView
  childViewOptions: ->
    template: @getOption 'entryTemplate'
    buttonClassName: @getOption 'buttonClassName'
  className: 'btn-group btn-group-justified'
  childViewTriggers:
    'button:clicked': 'toolbar:entry:clicked'
     
class ToolbarView extends Marionette.View
  template: tc.renderable () ->
    tc.div '.toolbar-entries'
  regions:
    entries:
      el: '.toolbar-entries'
      #replaceElement: true
  onRender: ->
    entryTemplate = @getOption('entryTemplate') or defaultButtonTemplate
    buttonClassName = @getOption('buttonClassName') or defaultButtonClassName
    view = new ToolbarEntryCollectionView
      collection: @collection
      entryTemplate: entryTemplate
      buttonClassName: buttonClassName
    @showChildView 'entries', view
  onChildviewToolbarEntryClicked: (child) ->
    url = child.model.get 'url'
    if url
      navigate_to_url url
    
    
export default ToolbarView

