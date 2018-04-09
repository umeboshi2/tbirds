# Inspired by routerapp
# https://github.com/RoundingWellOS/marionette.toolkit.routerapp
import _ from 'underscore'
import Backbone from 'backbone'
import EventRouter from 'backbone.eventrouter'
import Marionette from 'backbone.marionette'
import Toolkit from 'marionette.toolkit'

class TkRouter extends Toolkit.App
  # allow for override of EventRouter
  EventRouter: EventRouter
  constructor: ->
    super arguments
    @configRoutes()
    @router = new @EventRouter
      routeTriggers: @_routeTriggers
    @bindRouteEvents()
    @listenTo @router, 'noMatch', @stop

  # attaches parentRoutes and childRoutes
  # for each route in the hash creates a routeTriggers hash
  configRoutes: ->
    @_eventRoutes = _.extend({}, _.result(@, 'eventRoutes'))
    @_routeTriggers = _.mapObject(@_eventRoutes, (val, key, list) ->
      if val.route
        return val.route
      # if no route is returned, this key isn't a routeTrigger
      list[key] = null)
    return

  # handle route events
  # accepts a hash of "some:event":"actionFunction"
  # listens to the router channel and calls the appropriate action
  # via the routeAction handler
  bindRouteEvents: ->
    channel = @router.getChannel()
    _.each(@_eventRoutes, (action, event) ->
      # handle eventRoute definitions
      if action.action
        action = action.action
      @listenTo(channel, event, _.partial(@routeAction, event, action))
    , @)
    return

  # applies the route's action
  # starts this routerapp if necessary
  # triggers before and after events
  routeAction: (event, action) ->
    eventArgs = _.tail arguments, 2
    if not @isRunning()
      @start()

    @triggerMethod 'before:route', event, eventArgs
    if not _.isFunction action
      action = @[action]
    if action
      action.apply @, eventArgs
    @triggerMethod 'route', event, eventArgs
    return

  # handler that ensures one running app per type
  startApp: (appName, options) ->
    options = _.extend({}, _.result(@, 'routeOptions'), options)
    @stopCurrent()
    app = @getChildApp(appName).start(options)
    @setCurrent app
    return app

  setCurrent: (app) ->
    @_current = app
    return
    
  getCurrent: ->
    return @_current

  stopCurrent: ->
    if @_current
      @_current.stop()
    return @

  # takes an event and translates data into the applicable url fragment
  translateEvent: (event) ->
    route = @router.getDefaultRoute event
    return @router.translateRoute(route, _.drop(arguments, 0))

  # takes an event and changes the URL without triggering or adding to
  # history
  replaceRoute: ->
    url = @translateEvent.apply @, arguments
    Backbone.history.navigate(url, {trigger: false, replace: true})

export default TkRouter

  
