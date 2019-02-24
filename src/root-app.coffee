import Backbone from 'backbone'
import Toolkit from 'marionette.toolkit'
import tc from 'teacup'

import MessagesApp from './tkmessages'
import NavbarApp from './tknavbar'
import MainPageLayout from './tklayout'

if __useCssModules__
  require "../sass/tklayout.scss"

MainChannel = Backbone.Radio.channel 'global'

export class TkAppState extends Backbone.Model
  defaults:
    startHistory: true
    appConfig: {}

class RootApp extends Toolkit.App
  StateModel: TkAppState
  initialize: (options) ->
    @initState options
    cfg = @getOption 'appConfig'
    AppLayout = cfg?.layout or MainPageLayout
    layout = new AppLayout cfg.layoutOptions
    @showView layout

  onStart: (options) ->
    c = MainChannel.request 'main-controller'
    c.loadFrontDoor()

export default RootApp

    
    
