import { Radio, history as BBhistory } from 'backbone'
import { MnObject } from 'backbone.marionette'
import AppRouter from './routers/approuter'
import RequireController from './require-controller'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'

class AppletRouter extends AppRouter
  appRoutes:
    'http*remainder': 'directLink'
    ':applet*path': 'routeApplet'
  onRoute: (name, path, args) ->
    if name is 'directLink'
      if args.length == 2
        if args[1] isnt null
          url = "http#{args.join('?')}"
        else
          url = "http#{args[0]}"
        window.open url, '_blank'
      else
        console.warn "unhandled directLink"
    if __DEV__ and DEBUG
      console.log "MainRouter.onRoute", name, path, args

MainChannel.reply 'main:app:create-main-router', ->
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
