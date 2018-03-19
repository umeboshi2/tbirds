import tc from 'teacup'
import marked from 'marked'


import { form_group_input_div } from './forms'
import capitalize from '../util/capitalize'

# Main Templates must use teacup.
# The template must be a teacup.renderable,
# and accept a layout model as an argument.

########################################
# Templates
########################################

base_item_template = (name, route_name) ->
  tc.renderable (model) ->
    item_btn = ".btn.btn-secondary.btn-sm"
    tc.li ".list-group-item.#{name}-item", ->
      tc.span ->
        tc.a href:"##{route_name}/#{name}s/view/#{model.id}", model.name
      tc.span '.btn-group.pull-right', ->
        tc.button ".edit-item.#{item_btn}.btn-info.fa.fa-edit", 'edit'
        tc.button ".delete-item.#{item_btn}.btn-danger.fa.fa-close", 'delete'

base_list_template = (name) ->
  tc.renderable (model) ->
    tc.div '.listview-header', ->
      tc.text capitalize name
    tc.hr()
    tc.ul "##{name}-container.list-group"

export {
  base_item_template
  base_list_template
  }
  
