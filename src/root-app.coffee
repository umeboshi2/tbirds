import { App } from 'marionette.toolkit'
import MainPageLayout from './tklayout'

class RootApp extends App
  initialize: (options) ->
    @initState options
    cfg = @getOption 'appConfig'
    AppLayout = cfg?.layout or MainPageLayout
    layout = new AppLayout cfg.layoutOptions
    @showView layout

export default RootApp
