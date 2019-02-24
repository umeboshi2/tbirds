import { result } from 'underscore'
import Backbone from 'backbone'
import { Behavior } from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

import EmptyView from '../views/empty'

export default class ShowInitialEmptyContent extends Behavior
  options:
    emptyView: EmptyView
  onDomRefresh: ->
    View = @getOption 'emptyView'
    view = new View
    @view.showChildView 'content', view
