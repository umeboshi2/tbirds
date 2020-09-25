import $ from 'jquery'
import { Collection } from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

# this needs to be contained in a 'nav' region
class PaginationView extends View
  options: ->
    setKeyHandler: false
    barLength: 15
    barStopAt: 7
  tagName: 'ul'
  className: 'pagination'
  templateContext: ->
    collection: @collection
    barLength: @getOption 'barLength'
    barStopAt: @getOption 'barStopAt'
  template: tc.renderable (model) ->
    if model instanceof Collection
      state = model.state
    else
      state = model.collection.state
    firstPage = state.firstPage
    lastPage = state.lastPage
    ellipsis = false
    if lastPage > model.barLength
      ellipsis = true
      stopAt = model.barStopAt
      resumeAt = lastPage - model.barStopAt
    tc.li '.page-item', ->
      tc.a '.prev.page-link', ->
        tc.i '.fa.fa-arrow-left'
    ellipsisDrawn = false
    for p in [firstPage..lastPage]
      if ellipsis
        if p >= stopAt and p <= resumeAt
          if not ellipsisDrawn
            ellipsisDrawn = true
            tc.li '.page-item', ->
              tc.a '.ellipsis-page.page-link',
              '...'
          continue
      tc.li '.page-item', ->
        tc.a '.numbered-page.page-link',
        href:'#', data: pageNumber: p, p
    tc.li '.page-item', ->
      tc.a '.next.page-link', ->
        tc.i '.fa.fa-arrow-right'
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
    cp = $("[data-pagenumber=\"#{state.currentPage}\"]")
    cpp = cp.parent()
    cpp.addClass 'active'

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
    
export default PaginationView
