Marionette = require 'backbone.marionette'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

# FIXME
# applets/appname/main needs to be resolvable
# by using webpack resolve alias

# Object to contain registered applets
# Using this prevents a loop when a approute
# is requested but not matched in an AppRouter
# Unless the AppRouter has a match for the requested
# approute, the main router will try to load the
# AppRouter again, causing a loop.
registered_apps = {}

# FIXME
# This isn't being used currently.  This is here
# when the code develops to the point of being
# able to remove unused child apps to save memory.
MainChannel.reply 'main:applet:unregister', (appname) ->
  delete registered_apps[appname]

MainChannel.reply 'main:applet:register', (appname, applet) ->
  registered_apps[appname] = applet

MainChannel.reply 'main:applet:get-applet', (appname) ->
  registered_apps[appname]
  

class RequireController extends Marionette.Object
  _route_applet: (applet) ->
    MainChannel.request "applet:#{applet}:route"

  loadFrontDoor: ->
    config = MainChannel.request 'main:app:config'
    appname = config?.frontdoorApplet or 'frontdoor'
    handler = System.import "applets/#{appname}/main"
    if __DEV__
      console.log "Frontdoor system.import", appname
    handler.then (Applet) =>
      applet = new Applet
        appConfig: config
        isFrontdoorApplet: true
      MainChannel.request 'main:applet:register', appname, applet
      applet.start()
      Backbone.history.start() unless Backbone.history.started
      if __DEV__
        hash = window.location.hash
        console.log "History Started at", hash
      
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
    if appname in Object.keys registered_apps
      throw new Error "Unhandled applet path ##{appname}/#{suffix}"
    handler = System.import "applets/#{appname}/main"
    if __DEV__
      console.log "system.import", appname
    handler.then (Applet) ->
      applet = new Applet
        appConfig: config
      MainChannel.request 'main:applet:register', appname, applet
      applet.start()
      Backbone.history.loadUrl()
    .catch (err) ->
      if err.message.startsWith 'Cannot find module'
        MessageChannel.request 'warning', "Bad route #{appname}, #{suffix}!!"
      # catch this here for initial page load with invalid
      # subpath
      else if err.message.startsWith 'Unhandled applet'
        MessageChannel.request 'warning', err.message
      else
        throw err
      
  routeApplet: (applet, href) ->
    try
      @_handle_route applet, href
    catch err
      if err.message.startsWith 'Unhandled applet'
        MessageChannel.request 'warning', err.message
        
class AppletRouter extends Marionette.AppRouter
  appRoutes:
    ':applet' : 'routeApplet'
    ':applet/*path': 'routeApplet'

  onRoute: (name, path, args) ->
    if __DEV__
      console.log "MainRouter.onRoute", name, path, args

MainChannel.reply 'main:app:route', () ->
  controller = new RequireController
  router = new AppletRouter
    controller: controller
  MainChannel.reply 'main-controller', ->
    controller
  MainChannel.reply 'main-router', ->
    router
    
module.exports =
  RequireController: RequireController
  AppletRouter: AppletRouter

  
