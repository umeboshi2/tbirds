import $ from 'jquery'
import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

paginateButtons =
  leftArrow: tc.renderable ->
    tc.li '.page-item', ->
      tc.a '.prev.page-link.bg-body-d5', ->
        tc.i '.fa.fa-arrow-left'
  rightArrow: tc.renderable ->
    tc.li '.page-item', ->
      tc.a '.next.page-link.bg-body-d5', ->
        tc.i '.fa.fa-arrow-right'
  pageItem: tc.renderable (index) ->
    tc.li '.page-item', ->
      tc.a '.numbered-page.page-link.bg-body-d5.text-dark',
      href:'#', data: pageNumber: index, "#{index+1}"
  ellipsisItem: tc.renderable ->
    tc.li '.page-item', ->
      tc.a '.ellipsis-page.page-link.bg-body-d5.text-dark',
      '...'

stateItems = tc.renderable (model) ->
  if model instanceof Backbone.Collection
    state = model.state
  else
    state = model.collection.state
  totalPages = state.totalPages
  firstPage = state.firstPage
  lastPage = state.lastPage
  currentPage = state.currentPage
  ellipsis = false
  if lastPage > model.barLength
    ellipsis = true
    stopAt = model.barStopAt
    resumeAt = lastPage - model.barStopAt
  ellipsisDrawn = false
  for p in [firstPage..lastPage]
    if ellipsis
      if p >= stopAt and p <= resumeAt
        if not ellipsisDrawn
          ellipsisDrawn = true
          tc.li '.page-item', ->
            tc.a '.ellipsis-page.page-link.bg-body-d5.text-dark',
            '...'
        continue
    paginateButtons.pageItem p

# %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

makePageItem = tc.renderable (model, currentIndex) ->
  state = model.state
  pb = paginateButtons
  if currentIndex == model.barLength - 2
    pb.ellipsisItem()
  else
    pb.pageItem currentIndex
  currentIndex += 1

stateItemsNew = tc.renderable (model) ->
  if model instanceof Backbone.Collection
    state = model.state
  else
    state = model.collection.state
  totalPages = state.totalPages
  firstPage = state.firstPage
  lastPage = state.lastPage
  currentPage = state.currentPage
  s = state
  currentIndex = 0
  totalItems = model.barLength
  pb = paginateButtons
  
  ellipsis = false
  if s.totalPages > model.barLength
    ellipsis = true
  #makePageItem(model, currentIndex) while currentIndex < model.barLength
  loop
    almostThere = model.barLength - 2
    lastIndex = model.barLength - 1
    leftEllipsisBreak = almostThere - 3
    leftEllipsis = almostThere - 4
    if currentIndex == leftEllipsis
      if state.currentPage > leftEllipsisBreak
        pb.ellipsisItem()
    if currentIndex == almostThere
      pb.ellipsisItem()
    else if currentIndex == lastIndex
      pb.pageItem state.lastPage
    else
      pb.pageItem currentIndex
    currentIndex += 1
    if currentIndex == model.barLength
      break
    
  
# this needs to be contained in a 'nav' region
export default class PaginationView extends View
  options: ->
    setKeyHandler: false
    barLength: 10
    barStopAt: 7
    _keysBinded: false
  tagName: 'ul'
  className: 'pagination'
  template: tc.renderable (model) ->
    pb = paginateButtons
    pb.leftArrow()
    #stateItems model
    stateItemsNew model
    pb.rightArrow()
    
  templateContext: ->
    collection: @collection
    barLength: @getOption 'barLength'
    barStopAt: @getOption 'barStopAt'
  ui:
    numberedPage: '.numbered-page'
    prevButton: '.prev'
    nextButton: '.next'
  events:
    'click @ui.numberedPage': 'turnPage'
    'click @ui.prevButton': 'getPreviousPage'
    'click @ui.nextButton': 'getNextPage'
  turnPage: (event) ->
    event.preventDefault()
    el = $(event.target)
    pageNumber = el.attr 'data-pagenumber'
    @collection.getPage Number pageNumber
    @render()
    @updateNavButtons()

  updateEndArrows: (state) ->
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

  deactivatePages: ->
    @ui.numberedPage.parent().removeClass 'active'
    @ui.numberedPage.removeClass 'text-white'
    @ui.numberedPage.addClass 'text-dark'
    
  updateNavButtons: ->
    state = @collection.state
    @updateEndArrows state
    @deactivatePages()
    @setActivePage()


  setActivePage: ->
    state = @collection.state
    selector = "[data-pagenumber=\"#{state.currentPage}\"]"
    cp = $(selector)
    
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
    else if onFirstPage and direction is 'prev'
      return
    else
      throw new Error "bad direction '#{direction}'"
    @render()
    return resp
    
  getPreviousPage: ->
    return @getAnotherPage 'prev'
      
  getNextPage: ->
    return @getAnotherPage 'next'
      
  onRender: ->
    setKeyHandler = @getOption 'setKeyHandler'
    if setKeyHandler
      @onRenderHandleKeys()

  onDomRefresh: ->
    @setActivePage()
    
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
    unless @options._keysBinded
      $("html").keydown @keydownHandler
      @options._keysBinded = true
      
  onBeforeDestroyHandleKeys: ->
    $("html").unbind 'keydown', @keydownHandler
    
