Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
tc = require 'teacup'

{ modal_close_button } = require './templates/buttons'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

# FIXME, this depends on the model having a "name" attribute
ConfirmDeleteTemplate = tc.renderable (model) ->
  tc.div '.modal-dialog', ->
    tc.div '.modal-content', ->
      tc.h3 "Do you really want to delete #{model._humanIdentifier}?"
      tc.div '.modal-body', ->
        tc.div '#selected-children'
      tc.div '.modal-footer', ->
        tc.ul '.list-inline', ->
          btnclass = 'btn.btn-default.btn-sm'
          tc.li "#confirm-delete-button", ->
            modal_close_button 'OK', 'check'
          tc.li "#cancel-delete-button", ->
            modal_close_button 'Cancel'
    

class ConfirmDeleteModal extends Backbone.Marionette.View
  template: ConfirmDeleteTemplate
  templateContext: ->
    # FIXME this is underscored to hopefully
    # keep from potentially clobbering generic model attribute.
    # Find a better way to do this.
    _humanIdentifier: @getOption('modelHumanIdentifier') or 'name'
  ui:
    confirm_delete: '#confirm-delete-button'
    cancel_button: '#cancel-delete-button'
    
  events: ->
    'click @ui.confirm_delete': 'confirm_delete'

  confirm_delete: ->
    name = @model.get 'name'
    response = @model.destroy()
    response.done ->
      MessageChannel.request 'success', "#{name} deleted.",
    response.fail ->
      MessageChannel.request 'danger', "#{name} NOT deleted."
      
module.exports = ConfirmDeleteModal

