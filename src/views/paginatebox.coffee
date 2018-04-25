import $ from 'jquery'
import Marionette from 'backbone.marionette'
import tc from 'teacup'


navigateTemplate = tc.renderable ->
  tc.div '.btn-group', ->
    tc.button '.prev.btn.btn-secondary', type:'button', ->
      tc.i '.fa.fa-arrow-left'
    tc.button '.next.btn.btn-secondary', type:'button', ->
      tc.i '.fa.fa-arrow-right'
    
export default class PaginateBox extends Marionette.View
  template: navigateTemplate
  ui:
    prevButton: '.prev'
    nextButton: '.next'
  events:
    'click @ui.prevButton': 'getPreviousPage'
    'click @ui.nextButton': 'getNextPage'
  templateContext: ->
    collection: @collection
  _onFirstPage: ->
    state = @collection.state
    diff = state.currentPage - state.firstPage
    return diff is 0
    
  updateNavButtons: ->
    if @_onFirstPage()
      @ui.prevButton.hide()
    else
      @ui.prevButton.show()
    currentPage = @collection.state.currentPage
    if currentPage != @collection.state.lastPage
      @ui.nextButton.show()
    else
      @ui.nextButton.hide()
    if @collection.state.totalRecords is 0
      @ui.prevButton.hide()
      @ui.nextButton.hide()

  keyCommands:
    prev: 37
    next: 39
  handleKeyCommand: (command) ->
    if command in ['prev', 'next']
      @getAnotherPage command
  keydownHandler: (event) =>
    for key, value of @keyCommands
      if event.keyCode is value
        @handleKeyCommand key

  onRender: ->
    @updateNavButtons()
    @collection.on 'pageable:state:change', =>
      @updateNavButtons()
    $('html').keydown @keydownHandler

  onBeforeDestroy: ->
    @collection.off "pageable:state:change"
    $("html").unbind "keydown", @keydownHandler

  getAnotherPage: (direction) ->
    currentPage = @collection.state.currentPage
    onLastPage = currentPage is @collection.state.lastPage
    response = undefined
    if direction is 'prev' and currentPage
      response = @collection.getPreviousPage()
    else if direction is 'next' and not onLastPage
      response = @collection.getNextPage()
    if __DEV__ and response
      response.done ->
        console.log "Cleanup?"
  getPreviousPage: ->
    @getAnotherPage 'prev'
  getNextPage: ->
    @getAnotherPage 'next'
