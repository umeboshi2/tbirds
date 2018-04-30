import $ from 'jquery'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

# this needs to be contained in a 'nav' region
export default class PaginationView extends Marionette.View
  tagName: 'ul'
  className: 'pagination'
  template: tc.renderable (model) ->
    if model instanceof Backbone.Collection
      state = model.state
    else
      state = model.collection.state
    totalPages = state.totalPages
    firstPage = state.firstPage
    lastPage = state.lastPage
    tc.li '.page-item', ->
      tc.a '.prev.page-link.bg-body-d5', ->
        tc.i '.fa.fa-arrow-left'
    for p in [firstPage..lastPage]
      tc.li '.page-item', ->
        tc.a '.numbered-page.page-link.bg-body-d5.text-dark',
        href:'#', data: pageNumber: p, p
    tc.li '.page-item', ->
      tc.a '.next.page-link.bg-body-d5', ->
        tc.i '.fa.fa-arrow-right'
  templateContext: ->
    collection: @collection
  ui:
    numberedPage: '.numbered-page'
    prevButton: '.prev'
    nextButton: '.next'
  events:
    'click @ui.numberedPage': 'turnPage'
    'click @ui.prevButton': 'getPreviousPage'
    'click @ui.nextButton': 'getNextPage'
  onDomRefresh: ->
    @updateNavButtons()
  turnPage: (event) ->
    event.preventDefault()
    el = $(event.target)
    pageNumber = el.attr 'data-pagenumber'
    @collection.getPage Number pageNumber
    @updateNavButtons()

  updateNavButtons: ->
    state = @collection.state
    prevItem = @ui.prevButton.parent()
    if state.currentPage == state.firstPage
      unless prevItem.hasClass 'disabled'
        prevItem.addClass 'disabled'
    else
      if prevItem.hasClass 'disabled'
        prevItem.removeClass 'disabled'
    nextItem = @ui.nextButton.parent()
    if state.currentPage == state.lastPage
      unless nextItem.hasClass 'disabled'
        nextItem.addClass 'disabled'
    else
      if nextItem.addClass 'disabled'
        nextItem.removeClass 'disabled'
    @ui.numberedPage.parent().removeClass 'active'
    @ui.numberedPage.removeClass 'text-white'
    @ui.numberedPage.addClass 'text-dark'
    cp = $("[data-pagenumber=\"#{state.currentPage}\"]")
    cpp = cp.parent()
    cpp.addClass 'active'
    cp.removeClass 'text-dark'
    cp.addClass 'text-white'

  getAnotherPage: (direction) ->
    state = @collection.state
    onLastPage = state.currentPage == state.lastPage
    # we need this in case the pages start at zero
    onFirstPage = state.currentPage == state.firstPage
    if direction is 'prev' and not onFirstPage
      if state.currentPage != state.firstPage
        resp = @collection.getPreviousPage()
    else if direction is 'next' and not onLastPage
      resp = @collection.getNextPage()
    else if onLastPage
      return
    else
      throw new Error "bad direction '#{direction}'"
    @updateNavButtons()
    return resp
    
  getPreviousPage: ->
    return @getAnotherPage 'prev'
      
  getNextPage: ->
    return @getAnotherPage 'next'
      
  onRender: ->
    setKeyHandler = @getOption 'setKeyHandler'
    if setKeyHandler
      @onRenderHandleKeys()
      
  onBeforeDestroy: ->
    setKeyHandler = @getOption 'setKeyHandler'
    if setKeyHandler
      @onBeforeDestroyHandleKeys()
    
  keycommands:
    prev: 37
    next: 39
  handleKeyCommand: (command) ->
    if command in ['prev', 'next']
      @getAnotherPage command
  keydownHandler: (event) =>
    for key, value of @keycommands
      if event.keyCode == value
        @handleKeyCommand key

  onRenderHandleKeys: ->
    $("html").keydown @keydownHandler

  onBeforeDestroyHandleKeys: ->
    $("html").unbind 'keydown', @keydownHandler
    
