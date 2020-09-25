import { Behavior } from 'backbone.marionette'

import EmptyView from '../views/empty'

class ShowInitialEmptyContent extends Behavior
  options:
    emptyView: EmptyView
  onDomRefresh: ->
    View = @getOption 'emptyView'
    view = new View
    @view.showChildView 'content', view

export default ShowInitialEmptyContent
