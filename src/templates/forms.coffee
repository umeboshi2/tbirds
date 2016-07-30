$ = require 'jquery'
_ = require 'underscore'
tc = require 'teacup'


########################################
# Form Templates
########################################
form_group_input_div = tc.renderable (data) ->
  tc.div '.form-group', ->
    tc.label '.control-label',
      for:data.input_id
      data.label
    if data?.input_type
      input_type = tc[data.input_type]
    else
      input_type = tc.input
    input_type "##{data.input_id}.form-control", data.input_attributes

login_form = tc.renderable (user) ->
  tc.form
    role:'form'
    method: 'POST'
    action: '/login', ->
      form_group_input_div
        input_id: 'input_username'
        label: 'User Name'
        input_attributes:
          name: 'username'
          placeholder: 'User Name'
      form_group_input_div
        input_id: 'input_password'
        label: 'Password'
        input_attributes:
          name: 'password'
          type: 'password'
          placeholder: 'Type your password here....'
      tc.button '.btn.btn-default', type:'submit', 'login'

name_content_form = tc.renderable (model) ->
  form_group_input_div
    input_id: 'input_name'
    label: 'Name'
    input_attributes:
      name: 'name'
      placeholder: 'Name'
  form_group_input_div
    input_id: 'input_content'
    input_type: tc.textarea
    label: 'Content'
    input_attributes:
      name: 'content'
      placeholder: '...'
  tc.input '.btn.btn-default.btn-xs', type:'submit', value:'Add'

########################################
module.exports =
  form_group_input_div: form_group_input_div
  login_form: login_form
  name_content_form: name_content_form
