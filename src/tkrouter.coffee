import RequireController from './require-controller'
import { AppletRouter } from './applet-router-only'
import { App } from 'marionette.toolkit'

class RouterApp extends App
  initialize: ->
    appConfig = @getOption 'appConfig'
    controller = new RequireController
    router = new AppletRouter
      controller: controller
    @router = router

  getRouter: ->
    return @router
  getController: ->
    return @router.controller
  onStart: ->
    @router.controller.loadFrontDoor()

export default RouterApp
