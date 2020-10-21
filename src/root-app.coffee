import { Model, Radio } from 'backbone'
import { App } from 'marionette.toolkit'

import MainPageLayout from './tklayout'

MainChannel = Radio.channel 'global'

export class TkAppState extends Model
  defaults:
    startHistory: true
    appConfig: {}

class RootApp extends App
  StateModel: TkAppState
  initialize: (options) ->
    @initState options
    cfg = @getOption 'appConfig'
    AppLayout = cfg?.layout or MainPageLayout
    layout = new AppLayout cfg.layoutOptions
    @showView layout

  onStart: ->
    c = MainChannel.request 'main-controller'
    c.loadFrontDoor()

export default RootApp

    
    
