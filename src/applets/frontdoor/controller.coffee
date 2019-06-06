import path from 'path'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

{ MainController } = require '../../controllers'
{ login_form } = require '../../templates/forms'
import SlideDownRegion from '../../regions/slidedown'
import navigate_to_url from '../../util/navigate-to-url'
import { BaseAppletLayout } from '../../views/layout'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

tc = require 'teacup'

frontdoor_template = tc.renderable () ->
  tc.div '#main-content.col-sm-12'
  
class FrontdoorLayout extends Backbone.Marionette.View
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
    
  _view_resource: (doc) ->
    @setup_layout_if_needed()
    require.ensure [], () =>
      { FrontDoorMainView } = require './views'
      view = new FrontDoorMainView
        model: doc
      @layout.showChildView 'content', view
    # name the chunk
    , 'frontdoor-main-view'
    
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
    navigate_to_url '/'
    
  frontdoor_hasuser: (user) ->
    @defaultView()

  viewPage: (name) ->
    console.log "NAME IS", name
    @setupLayoutIfNeeded()
    model = MainChannel.request 'main:app:get-document', name
    #model = new AssetDocument()
    #model.url = path.join urlRoot, name
    console.log "MODEL IS", model
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
