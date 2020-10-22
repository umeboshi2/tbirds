import { Radio, history as BBhistory } from 'backbone'
import { MnObject } from 'backbone.marionette'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'

# FIXME
# applets/appname/main needs to be resolvable
# by using webpack resolve alias

# FIXME: Using backticks for import() statements. Inner
# js backticks are escaped for dynamic expressions.
# https://github.com/jashkenas/coffeescript/issues/4834#issuecomment-354375627

# Object to contain registered applets
# Using this prevents a loop when a approute
# is requested but not matched in an AppRouter
# Unless the AppRouter has a match for the requested
# approute, the main router will try to load the
# AppRouter again, causing a loop.
registeredApplets = {}

RadioCotroller = MnObject.extend
  channelName: 'applets'

class RequireController extends RadioCotroller
  initialize: ->
    channel = @getChannel()
    channel.reply 'register', (appName, applet) ->
      registeredApplets[appName] = applet
      return
    channel.reply 'unregister', (appName) ->
      delete registeredApplets[appName]
      return
    channel.reply 'get', (appName) ->
      return registeredApplets[appName]
    channel.reply 'getAll', ->
      return registeredApplets
  loadFrontDoor: ->
    appletChannel = @getChannel()
    config = MainChannel.request 'main:app:config'
    appname = config?.frontdoorApplet or 'frontdoor'
    #handler = System.import "applets/#{appname}/main"
    handler = `import(\`applets/${appname}/main\`)` # noqa
    if __DEV__ and DEBUG
      console.log "Frontdoor system.import", appname
    handler.then (Applet) ->
      # FIXME fix applet structure to provide appropriate export
      applet = new Applet.default
        appConfig: config
        appName: appname
        isFrontdoorApplet: true
        channelName: appname
      appletChannel.request 'register', appname, applet
      applet.start()
      BBhistory.start() unless BBhistory.started
      return
    return
    
  _handleRoute: (appname, suffix) ->
    appletChannel = @getChannel()
    if __DEV__ and DEBUG
      console.log "_handleRoute", appname, suffix
    if suffix and suffix.startsWith '/'
      while suffix.startsWith '/'
        if __DEV__ and DEBUG
          console.log "Suffix.Startswith", suffix
        suffix = suffix.slice 1
    config = MainChannel.request 'main:app:config'
    if not appname
      appname = 'frontdoor'
    if appname in _.keys config.appletRoutes
      appname = config.appletRoutes[appname]
      if __DEV__
        console.log "Using defined appletRoute", appname
    if appname in Object.keys registeredApplets
      throw new Error "Unhandled applet path ##{appname}/#{suffix}"
    #handler = System.import "applets/#{appname}/main"
    handler = `import(\`applets/${appname}/main\`)` # noqa
    if __DEV__ and DEBUG
      console.log "system.import", appname
    handler.then (Applet) ->
      # FIXME fix applet structure to provide appropriate export
      applet = new Applet.default
        appConfig: config
        appName: appname
        channelName: appname
      appletChannel.request 'register', appname, applet
      applet.start()
      BBhistory.loadUrl()
      return
      console.log "handler should have applet", applet
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
      else
        throw err
    return
    
  directLink: (remainder) ->
    if __DEV__
      console.warn "directLink", remainder
    return

export default RequireController
