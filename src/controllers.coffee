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
    
  setup_layout: ->
    @layout = new @layoutClass
    #console.log "created layout", @layout
    applet = @_get_applet()
    if applet.hasView()
      #console.log "applet has view"
      applet.empty()
    applet.show @layout

  # use this method to create a layout only if
  # needed, making routing within the applet
  # more efficient.
  setup_layout_if_needed: ->
    if @layout is undefined
      #console.log 'layout is undefined'
      @setup_layout()
    else if @layout.isDestroyed()
      #console.log 'layout is destroyed ------>', @layout
      @setup_layout()
    
  
  _get_region: (region) ->
    @layout.getRegion region

  _show_view: (vclass, model) ->
    view = new vclass
      model: model
    @layout.showChildView 'content', view

  _load_view: (vclass, model, objname) ->
    # FIXME
    # presume "id" is only attribute there if length is 1
    if model.isEmpty() or Object.keys(model.attributes).length is 1
      response = model.fetch()
      response.done =>
        @_show_view vclass, model
      response.fail ->
        msg = "Failed to load #{objname} data."
        MessageChannel.request 'danger', msg
    else
      @_show_view vclass, model
      
class ExtraController extends BaseController
  channelName: ->
    @getOption('channelName') or 'global'
  initialize: (options) ->
    @appletName = options.appletName
    @applet = MainChannel.request 'main:applet:get-applet', @appletName
    @mainController = @applet.router.controller
    @channel = @getChannel()
  setup_layout_if_needed: ->
    @mainController.setup_layout_if_needed()
  showChildView: (region, view) ->
    @mainController.layout.showChildView region, view
  
module.exports =
  BaseController: BaseController
  MainController: MainController
  ExtraController: ExtraController
  
