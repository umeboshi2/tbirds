import { Behavior } from 'backbone.marionette'
import Packery from 'packery'
import imagesLoaded from 'imagesloaded'

class HasPackeryView extends Behavior
  options:
    listContainer: '.list-container'
    hasPageableCollection: false
    packeryOptions:
      gutter: 1
      isInitLayout: false
      itemSelector: '.item'
      columnWidth: 10
      horizontalOrder: true
  ui: ->
    list: @getOption 'listContainer'
  regions:
    list: '@ui.list'
    
  setPackery: ->
    container = @getOption 'listContainer'
    packeryOptions = @getOption 'packeryOptions'
    @view.packery = new Packery container, packeryOptions
    
  setPackeryLayout: ->
    console.log "USING PACKERY!!!!!!!!!!!!"
    packeryOptions = @getOption 'packeryOptions'
    items = @$ packeryOptions.itemSelector
    imagesLoaded items, =>
      # FIXME we need to find a better option
      setTimeout =>
        @view.packery.reloadItems()
        @view.packery.layout()
      , 700
      
  onBeforeDestroy: ->
    @view.packery.destroy()
    
  onDomRefresh: () ->
    @setPackery()
    @setPackeryLayout()
    if @view?.afterDomRefresh
      @view.afterDomRefresh()
    
  collectionEvents: ->
    data = {}
    if @getOption 'hasPageableCollection'
      data['pageable:state:change'] = 'setPackeryLayout'
    return data
    
export default HasPackeryView
