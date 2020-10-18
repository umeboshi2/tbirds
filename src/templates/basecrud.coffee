import { capitalize } from 'lodash'
import tc from 'teacup'


# Main Templates must use teacup.
# The template must be a teacup.renderable,
# and accept a layout model as an argument.

########################################
# Templates
########################################

export base_item_template = (name, route_name) ->
  tc.renderable (model) ->
    item_btn = ".btn.btn-secondary.btn-sm"
    tc.li ".list-group-item.#{name}-item", ->
      tc.span ->
        tc.a href:"##{route_name}/#{name}s/view/#{model.id}", model.name
      tc.span '.btn-group.pull-right', ->
        tc.button ".edit-item.#{item_btn}.btn-info.fa.fa-edit", 'edit'
        tc.button ".delete-item.#{item_btn}.btn-danger.fa.fa-close", 'delete'

export base_list_template = (name) ->
  tc.renderable ->
    tc.div '.listview-header', ->
      tc.text capitalize name
    tc.hr()
    tc.ul "##{name}-container.list-group"
