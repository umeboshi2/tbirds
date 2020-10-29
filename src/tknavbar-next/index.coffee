import $ from 'jquery'
import { Model, Radio } from 'backbone'
import { App } from 'marionette.toolkit'

import './dbchannel'
#import NavbarHeaderView from './navbar-header'
#import NavbarEntriesView from './entries'
import BootstrapNavBarView from './main-view'

if __useCssModules__
  require "../../sass/tknavbar.scss"

MainChannel = Radio.channel 'global'
NavbarChannel = Radio.channel 'navbar'

class NavbarApp extends App
  initialize: ->
    appConfig = @getOption 'appConfig'
    layout = new BootstrapNavBarView
      model: new Model appConfig
    @showView layout
    if __DEV__
      @_nbview = layout

  onStart: ->
    # FIXME: @getView() returns root layout view
    cfg = MainChannel.request 'main:app:config'
    NavbarChannel.request 'clear-entries', 'site'
    NavbarChannel.request 'add-entries', cfg.navbarEntries, 'site'
    
export default NavbarApp


