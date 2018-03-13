import Marionette from 'backbone.marionette'

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
  return
  
MainChannel.reply 'main:applet:register', (appname, applet) ->
  registered_apps[appname] = applet
  return
  
MainChannel.reply 'main:applet:get-applet', (appname) ->
  return registered_apps[appname]

class RequireController extends Marionette.Object
  loadFrontDoor: ->
    config = MainChannel.request 'main:app:config'
    appname = config?.frontdoorApplet or 'frontdoor'
    handler = System.import "applets/#{appname}/main"
    if __DEV__
      console.log "Frontdoor system.import", appname
    handler.then (Applet) ->
      # FIXME fix applet structure to provide appropriate export
      applet = new Applet.default
        appConfig: config
        isFrontdoorApplet: true
      MainChannel.request 'main:applet:register', appname, applet
      applet.start()
      Backbone.history.start() unless Backbone.history.started
      return
    return
    
  _handleRoute: (appname, suffix) ->
    if __DEV__
      console.log "_handleRoute", appname, suffix
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
      # FIXME fix applet structure to provide appropriate export
      applet = new Applet.default
        appConfig: config
      MainChannel.request 'main:applet:register', appname, applet
      applet.start()
      Backbone.history.loadUrl()
      return
    .catch (err) ->
      if err.message.startsWith 'Cannot find module'
        MessageChannel.request 'warning', "Bad route #{appname}, #{suffix}!!"
        return
      # catch this here for initial page load with invalid
      # subpath
      else if err.message.startsWith 'Unhandled applet'
        MessageChannel.request 'warning', err.message
        return
      else
        throw err
    return
      
  routeApplet: (applet, href) ->
    try
      @_handleRoute applet, href
    catch err
      if err.message.startsWith 'Unhandled applet'
        MessageChannel.request 'warning', err.message
        return
    return
    
  directLink: (remainder) ->
    if __DEV__
      console.log "directLink", remainder
    return
    
class AppletRouter extends Marionette.AppRouter
  appRoutes:
    'http*remainder': 'directLink'
    ':applet' : 'routeApplet'
    ':applet/*path': 'routeApplet'

  onRoute: (name, path, args) ->
    if name is 'directLink'
      if args.length == 2
        if args[1] isnt null
          url = "http#{args.join('?')}"
        else
          url = "http#{args[0]}"
        window.open url, '_blank'
      else
        console.log "unhandled directLink"
    if __DEV__
      console.log "MainRouter.onRoute", name, path, args

MainChannel.reply 'main:app:route', () ->
  controller = new RequireController
  router = new AppletRouter
    controller: controller
  MainChannel.reply 'main-controller', ->
    return controller
  MainChannel.reply 'main-router', ->
    return router
  return

export {
  RequireController
  AppletRouter
  }
