import $ from 'jquery'
import Backbone from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

import make_field_input_ui from '../../util/make-field-input-ui'
import navigate_to_url from '../../util/navigate-to-url'

{ form_group_input_div } = require '../../templates/forms'
import BootstrapFormView from '../../views/bsformview'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

login_form =  tc.renderable (user) ->
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
  tc.input '.btn.btn-primary', type:'submit', value:'login'
  tc.div '.spinner.fa.fa-spinner.fa-spin'


class BaseView extends BootstrapFormView
  ui: ->
    uiobject = make_field_input_ui @fieldList
    return uiobject
  createModel: ->
    new Backbone.Model
  onSuccess: ->
    # FIXME start reloading the child apps
    # that recognize users
    navigate_to_url '#'
    


  
class LoginView extends BaseView
  template: login_form
  fieldList: ['username', 'password']
  updateModel: ->
    console.log 'updateModel called'
    @model.set 'username', @ui.username.val()
    @model.set 'password', @ui.password.val()
  saveModel: ->
    username  = @model.get 'username'
    password = @model.get 'password'
    xhr = $.ajax
      url: '/login'
      type: 'POST'
      data:
        username: username
        password: password
      dataType: 'json'
      success: (response) =>
        token = response.token
        MainChannel.request 'main:app:set-auth-token', token
        @trigger 'save:form:success', @model
        
      error: (response) =>
        if __DEV__
          console.log "error", response.responseJSON
        msg = response.responseJSON
        MessageChannel.request 'danger', msg.message
        @trigger 'save:form:failure', @model
    console.log "returning xhr", xhr
    

token_form =  tc.renderable (user) ->
  form_group_input_div
    input_id: 'input_token'
    label: 'Auth Token'
    input_attributes:
      name: 'token'
      placeholder: 'xxxxxxxxxxxxxxx'
  tc.input '.btn.btn-primary', type:'submit', value:'login'
  tc.div '.spinner.fa.fa-spinner.fa-spin'

class TokenView extends BaseView
  template: token_form
  fieldList: ['token']
  updateModel: ->
    console.log 'updateModel called'
    @model.set 'token', @ui.token.val()
  saveModel: ->
    token = @model.get 'token'
    MainChannel.request 'main:app:set-auth-token', token
    AuthRefresh = MainChannel.request 'main:app:AuthRefresh'
    refresh = new AuthRefresh
    response = refresh.fetch()
    response.fail =>
      msg = response.responseJSON
      MessageChannel.request 'danger', msg.message
      @trigger 'save:form:failure', @model
    response.done =>
      @trigger 'save:form:success', @model

class MainView extends View
  template: tc.renderable (model) ->
    tc.div '#login-form'
    tc.div '#token-form'
  regions:
    login: '#login-form'
    token: '#token-form'
  onRender: ->
    @showChildView 'login', new LoginView
    @showChildView 'token', new TokenView



    
    
export default MainView
