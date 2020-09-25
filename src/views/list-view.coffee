import { View } from 'backbone.marionette'

import ListGroupView from './list-group-collection-view.coffee'
import PaginateBar from './paginate-bar'

class ListView extends View
  regions: ->
    itemList: '@ui.itemList'
    paginateBar: '@ui.paginateBar'
  onRender: ->
    collection = @getOption 'collection'
    console.log "collection", collection
    view = new ListGroupView
      collection: collection
      childView: @getOption('ItemView')
      childViewTriggers: @getOption('childViewTriggers')
    @showChildView 'itemList', view
    if collection?.state?.totalPages > 1
      view = new PaginateBar
        collection: collection
        setKeyHandler: true
      @showChildView 'paginateBar', view
      

    
export default ListView

    
