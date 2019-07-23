import path from 'path'
import Backbone from 'backbone'
import { View } from 'backbone.marionette'

{ MainController } = require '../../controllers'
{ login_form } = require '../../templates/forms'
import SlideDownRegion from '../../regions/slidedown'
import navigate_to_url from '../../util/navigate-to-url'
import { BaseAppletLayout } from '../../views/layout'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

tc = require 'teacup'

import LoginView from './loginview'
import FrontDoorMainView from './views/docview'

urlRoot = "/assets/documents"

class AssetDocument extends Backbone.Model
  fetch: (options) ->
    options = options or {}
    options.dataType = 'text'
    super options
  parse: (response) ->
    content: response

class AssetCollection extends Backbone.Collection
  urlRoot: urlRoot

intro = 'intro'
if __DEV__
  intro = 'intro-dev'
class ReadMeModel extends AssetDocument
  url: "/assets/documents/#{intro}.md"

frontdoor_template = tc.renderable () ->
  #tc.div '#main-content.col-sm-10.col-sm-offset-1'
  tc.div '.row', ->
    tc.div '#main-content'

class FrontdoorLayout extends BaseAppletLayout
  template: frontdoor_template
  regions: ->
    content: new SlideDownRegion
      el: '#main-content'
      speed: 'slow'

class Controller extends MainController
  layoutClass: FrontdoorLayout

  setupLayoutIfNeeded: ->
    super()
    @layout.controller = @
    
  _viewResource: (doc) ->
    @setupLayoutIfNeeded()
    view = new FrontDoorMainView
      model: doc
    @layout.showChildView 'content', view

  _viewLogin: ->
    view = new LoginView
    @layout.showChildView 'content', view
    
  frontdoor_needuser: ->
    token = MainChannel.request 'main:app:decode-auth-token'
    if 'name' in Object.keys token
      @frontdoor_hasuser token
    else
      @show_login()
      
  showLogin: ->
    @setupLayoutIfNeeded()
    @_viewLogin()
    
  showLogout: ->
    MainChannel.request 'main:app:destroy-auth-token'
    SiteNavChannel.request 'set-index-entries'
    navigate_to_url '#'
    
  frontdoor_hasuser: (user) ->
    @defaultView()

  viewPage: (name) ->
    if __DEV__
      console.log "NAME IS", name
    @setupLayoutIfNeeded()
    model = MainChannel.request 'main:app:get-document', name
    response = model.fetch()
    response.done =>
      @_viewResource model
    response.fail ->
      MessageChannel.request 'warning', "failed to get #{name}"
    
  defaultView: ->
    @setupLayoutIfNeeded()
    #@show_login()
    @view_readme()
    
  frontdoor: ->
    config = MainChannel.request 'main:app:config'
    if config?.needLogin
      @frontdoor_needuser()
    else
      @defaultView()
      
export default Controller

