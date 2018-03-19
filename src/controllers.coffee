import $ from 'jquery'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'

import { ToolbarAppletLayout } from './views/layout'

import navigate_to_url from './util/navigate-to-url'
import scroll_top_fast from './util/scroll-top-fast'

MainChannel = Backbone.Radio.channel 'global'

#class BaseController extends Marionette.Object
BaseController = Marionette.Object.extend
  init_page: () ->
    # do nothing
  scrollTop: scroll_top_fast
  scroll_top: ->
    console.warn "use scrollTop instead"
    @scrollTop arguments
  navigateToUrl: navigate_to_url
  navigate_to_url: ->
    console.warn "use navigateToUrl instead"
    @navigateToUrl arguments

#class MainController extends BaseController
MainController = BaseController.extend
  layoutClass: ToolbarAppletLayout

  _getAppletRegion: ->
    app = MainChannel.request 'main:app:object'
    return app.getView().getRegion 'applet'
    
  setupLayout: ->
    layoutClass = @getOption 'layoutClass'
    @layout = new layoutClass
    region = @_getAppletRegion()
    if region.hasView()
      region.empty()
    @applet.setupAppletEntries()
    region.show @layout
    return
    
  setup_layout: ->
    console.warn "don't use setup_layout"
    @setupLayout()
    return
    
  # use this method to create a layout only if
  # needed, making routing within the applet
  # more efficient.
  setupLayoutIfNeeded: ->
    if @layout is undefined
      @setupLayout()
    else if @layout.isDestroyed()
      @setupLayout()
    return
  
  setup_layout_if_needed: ->
    console.warn "use setupLayoutIfNeeded instead"
    @setupLayoutIfNeeded()
    return
    
  _get_region: (region) ->
    console.warn "use _getRegion instead"
    return @_getRegion(region)
    
  _show_view: (vclass, model) ->
    console.warn "use _showView instead"
    @_showView(vclass, model)

  _load_view: (vclass, model, objname) ->
    console.warn "use _loadView instead"
    @_loadView(vclass, model, objname)

  _getRegion: (region) ->
    return @layout.getRegion region
    
  _showView: (vclass, model) ->
    view = new vclass
      model: model
    @layout.showChildView 'content', view
    return
    
  _isModelPresent: (model) ->
    # FIXME
    # presume "id" is only attribute there if length is 1
    return model.isEmpty() or Object.keys(model.attributes).length is 1
    
  _loadView: (vclass, model, objname) ->
    if @_isModelPresent(model)
      response = model.fetch()
      response.done =>
        @_showView vclass, model
        return
      response.fail ->
        msg = "Failed to load #{objname} data."
        MessageChannel.request 'danger', msg
        return
    else
      @_showView vclass, model
    return
    
#class ExtraController extends BaseController
ExtraController = BaseController.extend
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
    
#module.exports =
#  BaseController: BaseController
#  MainController: MainController
#  ExtraController: ExtraController

export {
  BaseController
  MainController
  ExtraController
  }
  

