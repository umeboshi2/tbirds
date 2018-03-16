import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

class HasMasonryView extends Marionette.Behavior
  options:
    listContainer: '.list-container'
    channel: 'global'
    masonryOptions:
      gutter: 1
      isInitLayout: false
      itemSelector: '.item'
      columnWidth: 10
      horizontalOrder: true
  ui: ->
    list: @getOption 'listContainer'
  regions:
    list: '@ui.list'
    
  setMasonry: ->
    container = @getOption 'listContainer'
    masonryOptions = @getOption 'masonryOptions'
    @view.masonry = new Masonry container, masonryOptions
    
  setMasonryLayout: ->
    masonryOptions = @getOption 'masonryOptions'
    items = @$ masonryOptions.itemSelector
    imagesLoaded items, =>
      @view.masonry.reloadItems()
      @view.masonry.layout()

  onBeforeDestroy: ->
    @view.masonry.destroy()
    
  onDomRefresh: () ->
    @setMasonry()
    @setMasonryLayout()
    if @view?.afterDomRefresh
      @view.afterDomRefresh()
    
  
export default HasMasonryView
