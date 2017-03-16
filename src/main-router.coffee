Marionette = require 'backbone.marionette'

BootStrapAppRouter = require 'agate/src/bootstrap_router'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

# applets/appname/main needs to be resolvable
# by using webpacke resolve alias
# 

class RequireController extends Marionette.Object
  _route_applet: (applet) ->
    MainChannel.request "applet:#{applet}:route"

  loadFrontDoor: ->
    config = MainChannel.request 'main:app:config'
    applet = config?.frontdoorApplet or 'frontdoor'
    handler = System.import "applets/#{applet}/main"
    console.log "system.import", applet
    handler.then (Applet) =>
      console.log "Applet", Applet
      applet = new Applet
      #MainChannel.request "applet:#{applet}:route"
      console.log "Starting frontdoor applet"
      applet.start()
      Backbone.history.start() unless Backbone.history.started
      console.log "History Started"
    
  _handle_route: (appname, suffix) ->
    if __DEV__
      console.log "_handle_route", appname, suffix
    config = MainChannel.request 'main:app:config'
    if not appname
      console.warn "No applet recognized", appname
      appname = 'frontdoor'
    if appname in Object.keys config.appletRoutes
      appname = config.appletRoutes[appname]
      console.log "Using defined appletRoute", appname
    handler = System.import "applets/#{appname}/main"
    if __DEV__
      console.log "system.import", appname
    handler.then (Applet) =>
      #console.log "Applet #{appname}", Applet
      applet = new Applet
      #console.log "Starting applet #{appname}"
      applet.start()
      Backbone.history.loadUrl()
    .catch ->
      MessageChannel.request 'warning', "Bad route #{appname}!!"
      
  routeApplet: (applet, href) ->
    @_handle_route applet, href

class Router extends Marionette.AppRouter
  appRoutes:
    ':applet/*': 'routeApplet'

  onRoute: (name, path, args) ->
    if __DEV__
      console.log "MainRouter.onRoute", name, path, args
    
MainChannel.reply 'app:main:route', () ->
  controller = new RequireController
  router = new Router
    controller: controller
  MainChannel.reply 'main-controller', ->
    controller
  MainChannel.reply 'main-router', ->
    router
    
