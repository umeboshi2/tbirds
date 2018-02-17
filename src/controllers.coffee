$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'

{ DefaultAppletLayout } = require './views/layout'

navigate_to_url = require './util/navigate-to-url'
scroll_top_fast = require './util/scroll-top-fast'

MainChannel = Backbone.Radio.channel 'global'

class BaseController extends Marionette.Object
  init_page: () ->
    # do nothing
  scroll_top: scroll_top_fast
  navigate_to_url: navigate_to_url

class MainController extends BaseController
  layoutClass: DefaultAppletLayout
  _get_applet: ->
    app = MainChannel.request 'main:app:object'
    app.getView().getRegion 'applet'
    
  setupLayout: ->
    @layout = new @layoutClass
    #console.log "created layout", @layout
    applet = @_get_applet()
    if applet.hasView()
      #console.log "applet has view"
      applet.empty()
    applet.show @layout
    return
    
  setup_layout: ->
    console.warn "don't use setup_layout"
    @setupLayout()
    return
    
  # use this method to create a layout only if
  # needed, making routing within the applet
  # more efficient.
  setup_layout_if_needed: ->
    if @layout is undefined
      #console.log 'layout is undefined'
      @setupLayout()
    else if @layout.isDestroyed()
      #console.log 'layout is destroyed ------>', @layout
      @setupLayout()
    return
  
  _get_region: (region) ->
    return @layout.getRegion region

  _show_view: (vclass, model) ->
    view = new vclass
      model: model
    @layout.showChildView 'content', view
    return
    
  _load_view: (vclass, model, objname) ->
    # FIXME
    # presume "id" is only attribute there if length is 1
    if model.isEmpty() or Object.keys(model.attributes).length is 1
      response = model.fetch()
      response.done =>
        @_show_view vclass, model
        return
      response.fail ->
        msg = "Failed to load #{objname} data."
        MessageChannel.request 'danger', msg
        return
    else
      @_show_view vclass, model
    return  
class ExtraController extends BaseController
  channelName: ->
    return @getOption('channelName') or 'global'
  initialize: (options) ->
    @appletName = options.appletName
    @applet = MainChannel.request 'main:applet:get-applet', @appletName
    @mainController = @applet.router.controller
    @channel = @getChannel()
    return
  setup_layout_if_needed: ->
    @mainController.setup_layout_if_needed()
    return
  showChildView: (region, view) ->
    @mainController.layout.showChildView region, view
    return
    
module.exports =
  BaseController: BaseController
  MainController: MainController
  ExtraController: ExtraController
  
