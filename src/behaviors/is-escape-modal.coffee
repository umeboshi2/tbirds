import $ from 'jquery'
import Backbone from 'backbone'
import { Behavior } from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'

export default class IsEscapeModal extends Behavior
  events:
    'click @ui.close_btn': 'onBeforeDestroy'
  keydownHandler: (event_object) =>
    keyCode = event_object.keyCode
    # handle escape('esc') key
    if keyCode == 27
      # we don't need to listen anymore
      $('html').unbind 'keydown', @keydownHandler
      @emptyModal()
  onDomRefresh: ->
    $('html').keydown @keydownHandler
  onBeforeDestroy: ->
    $('html').unbind 'keydown', @keydownHandler
  emptyModal: ->
    region = MainChannel.request 'main:app:modal-region'
    region.empty()
