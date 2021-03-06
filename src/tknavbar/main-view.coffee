import $ from 'jquery'
import { Model, Radio, history as BBhistory } from 'backbone'
import { View } from 'backbone.marionette'
import tc from 'teacup'

import NavbarHeaderView from './navbar-header'
import NavbarEntriesView from './entries'
#import NavbarToggleButton from './toggle-button'

MainChannel = Radio.channel 'global'
NavbarChannel = Radio.channel 'navbar'
    
class BootstrapNavBarView extends View
  tagName: 'nav'
  id: 'navbar-view'
  className: 'navbar navbar-expand-md'
  attributes:
    xmlns: 'http://www.w3.org/1999/xhtml'
    'xml:lang': 'en'
    role: 'navigation'
  template: tc.renderable ->
    tc.div '.navbar-header'
    tc.div '#navbar-view-collapse.collapse.navbar-collapse', ->
      tc.div '.site-entries'
      tc.div '.applet-entries'
      tc.div '.view-entries'
      tc.div '.user-entries.ml-auto'
  ui:
    header: '.navbar-header'
    siteEntries: '.site-entries'
    appletEntries: '.applet-entries'
    viewEntries: '.view-entries'
    userEntries: '.user-entries'
  regions:
    header: '@ui.header'
    siteEntries: '@ui.siteEntries'
    appletEntries: '@ui.appletEntries'
    viewEntries: '@ui.viewEntries'
    userEntries: '@ui.userEntries'
  onRender: ->
    if @model.get 'hasUser'
      app = MainChannel.request 'main:app:object'
      currentUser = app.getState 'currentUser'
      for entry in @model.get 'navbarEntries'
        if entry?.needUser and not currentUser
          continue
        NavbarChannel.request 'add-entry', entry, 'site'
    else
      navbarEntries = @model.get 'navbarEntries'
      NavbarChannel.request 'add-entries', navbarEntries, 'site'
    eview = new NavbarEntriesView
      collection: NavbarChannel.request 'get-entries', 'site'
    @showChildView 'siteEntries', eview
    aview = new NavbarEntriesView
      collection: NavbarChannel.request 'get-entries', 'applet'
    @showChildView 'appletEntries', aview
    vview = new NavbarEntriesView
      collection: NavbarChannel.request 'get-entries', 'view'
    @showChildView 'viewEntries', vview
    headerOpts =
      model: new Model @model.get 'brand'
    if @model.get 'navbarBrandTemplate'
      headerOpts.template = @model.get 'navbarBrandTemplate'
    hview = new NavbarHeaderView headerOpts
    @showChildView 'header', hview
    
  _routeToURl: (href) ->
    if href.startsWith '/'
      window.open href
    BBhistory.navigate href, trigger: true
    return

  childViewEvents:
    'click:brand': 'onChildviewClickBrand'
    
  # onChildviewClickBrand will not be called
  # without setting @childViewEvents
  onChildviewClickBrand: (view) ->
    eview = @getChildView 'siteEntries'
    eview.setAllInactive()
    url = view.model.get 'url'
    url = url or "#"
    @_routeToURl url
    return
    
export default BootstrapNavBarView


