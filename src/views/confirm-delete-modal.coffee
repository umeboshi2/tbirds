import { Radio } from 'backbone'
import { View as MnView } from 'backbone.marionette'
import tc from 'teacup'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'

class ConfirmDeleteModal extends MnView
  template: tc.renderable (model) ->
    name = model.name or "this model"
    tc.div '.modal-dialog', ->
      tc.div '.modal-content', ->
        tc.h3 "Delete #{name}?"
        tc.div '.modal-body', ->
          tc.div '.selected-children'
        tc.div '.modal-footer', ->
          tc.button '.btn.btn-warning.fa.fa-close.mr-auto',
          data:dismiss:'modal', 'Cancel'
          tc.button '.btn.btn-primary.ml-auto.submit-btn', "Delete"
  ui:
    submitBtn: '.submit-btn'
  events: ->
    'click @ui.submitBtn': 'confirmDelete'

  confirmDelete: ->
    console.log 'delete', @model
    response = @model.destroy()
    response.fail ->
      MessageChannel.request 'xhr-error', response
    response.done ->
      MainChannel.request 'main:app:empty-modal'
      
export default ConfirmDeleteModal
