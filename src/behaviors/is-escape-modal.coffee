$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

class IsEscapeModal extends Marionette.Behavior
  events:
    'click @ui.close_btn': 'onBeforeDestroy'
  keydownHandler: (event_object) =>
    keyCode = event_object.keyCode
    # handle escape('esc') key
    if keyCode == 27
      # NOTE sending click to the children
      # since @ui.close_btn may just be a
      # container for the modal_close_button
      @ui.close_btn.children().click()
      # NOTE
      # we make sure that we unbind the keydownHandler
      # @onBeforeDestroy seems to be skipped on keypress
      $('html').unbind 'keydown', @keydownHandler
  onDomRefresh: ->
    $('html').keydown @keydownHandler
  onBeforeDestroy: ->
    $('html').unbind 'keydown', @keydownHandler
    
module.exports = IsEscapeModal
