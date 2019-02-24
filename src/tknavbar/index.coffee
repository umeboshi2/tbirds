import $ from 'jquery'
import Backbone from 'backbone'
import Toolkit from 'marionette.toolkit'
import tc from 'teacup'

import './dbchannel'
import NavbarHeaderView from './navbar-header'
import NavbarEntriesView from './entries'
import BootstrapNavBarView from './main-view'

if __useCssModules__
  require "../../sass/tknavbar.scss"

MainChannel = Backbone.Radio.channel 'global'
NavbarChannel = Backbone.Radio.channel 'navbar'
MessageChannel = Backbone.Radio.channel 'messages'

class NavbarApp extends Toolkit.App
  initialize: (options) ->
    appConfig = @getOption 'appConfig'
    layout = new BootstrapNavBarView
      model: new Backbone.Model appConfig
    @showView layout
    if __DEV__
      @_nbview = layout

  onStart: ->
    # FIXME: @getView() returns root layout view
    cfg = MainChannel.request 'main:app:config'
    NavbarChannel.request 'clear-entries', 'site'
    NavbarChannel.request 'add-entries', cfg.navbarEntries, 'site'
    
export default NavbarApp


