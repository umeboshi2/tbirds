import { Radio, history as BBhistory } from 'backbone'
import { MnObject } from 'backbone.marionette'
import RequireController from './require-controller'
import { AppletRouter } from './applet-router-only'

MainChannel = Radio.channel 'global'
MessageChannel = Radio.channel 'messages'

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
