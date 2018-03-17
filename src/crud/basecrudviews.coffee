import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import tc from 'teacup'

import navigate_to_url from '../util/navigate-to-url'
import '../regions/bsmodal'
import { modal_close_button } from '../templates/buttons'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'



ConfirmDeleteTemplate = tc.renderable (model) ->
  tc.div '.modal-dialog', ->
    tc.div '.modal-content', ->
      tc.h3 "Do you really want to delete #{model.name}?"
      tc.div '.modal-body', ->
        tc.div '#selected-children'
      tc.div '.modal-footer', ->
        tc.ul '.list-inline', ->
          btnclass = 'btn.btn-secondary.btn-sm'
          tc.li "#confirm-delete-button", ->
            modal_close_button 'OK', 'check'
          tc.li "#cancel-delete-button", ->
            modal_close_button 'Cancel'
    

class ConfirmDeleteModal extends Marionette.View
  template: ConfirmDeleteTemplate
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
      
class BaseItemView extends Marionette.View
  ui:
    edit_item: '.edit-item'
    delete_item: '.delete-item'
    item: '.list-item'
    
  events: ->
    'click @ui.edit_item': 'edit_item'
    'click @ui.delete_item': 'delete_item'
    
  edit_item: ->
    navigate_to_url "##{@route_name}/#{@item_type}s/edit/#{@model.id}"
    
  delete_item: ->
    if __DEV__
      console.log "delete_#{@item_type}", @model
    view = new ConfirmDeleteModal
      model: @model
    if __DEV__
      console.log 'modal view', view
    show_modal view, true
    MainChannel.request 'main:app:show-modal', view, {backdrop:true}
    
class BaseListView extends Marionette.View
  regions: ->
    itemlist: "##{@item_type}-container"
  ui: ->
    make_new_item: "#new-#{@item_type}"
  onRender: ->
    view = new Marionette.CollectionView
      collection: @collection
      childView: @childView
    @showChildView 'itemlist', view
  events: ->
    'click @ui.make_new_item': 'make_new_item'

  _show_modal: (view, backdrop=false) ->
    modal_region = MainChannel.request 'main:app:get-region', 'modal'
    modal_region.backdrop = backdrop
    modal_region.show view
  
  make_new_item: ->
    # FIXME - fix url dont't add 's'
    navigate_to_url "##{@route_name}/#{@item_type}s/new"
    
export {
  BaseItemView
  BaseListView
  }

