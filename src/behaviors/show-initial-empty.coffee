Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

EmptyView = require '../views/empty'

class ShowInitialEmptyContent extends Backbone.Marionette.Behavior
  onDomRefresh: ->
    view = new EmptyView
    @view.showChildView 'content', view
    
module.exports = ShowInitialEmptyContent

