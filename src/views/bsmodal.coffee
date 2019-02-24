import $ from 'jquery'
import Backbone from 'backbone'
import { View } from 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
AppChannel = Backbone.Radio.channel 'ebcsv'

class BaseModalView extends View
  ui:
    html: 'html'
    close_btn: '#close-modal div'
    
  keydownHandler: (event_object) =>
    keyCode = event_object.keyCode
    #console.log "keyCode", keyCode
    # handle escape('esc') key
    if keyCode == 27
      @ui.close_btn.click()
      
  onDomRefresh: ->
    @ui.html.keydown @keydownHandler

  onBeforeDestroy: ->
    @ui.html.unbind 'keydown', @keydownHandler
  
export default BaseModalView


