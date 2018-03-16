import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

import EmptyView from '../views/empty'

export default class ShowInitialEmptyContent extends Marionette.Behavior
  onDomRefresh: ->
    view = new EmptyView
    @view.showChildView 'content', view
