import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

import EmptyView from '../views/empty'

export default class ShowInitialEmptyContent extends Marionette.Behavior
  options:
    emptyView: EmptyView
  onDomRefresh: ->
    view = new @getOption 'emptyView'
    @view.showChildView 'content', view
