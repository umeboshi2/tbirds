import $ from 'jquery'
import Backbone from 'backbone'
import Marionette from 'backbone.marionette'
import Toolkit from 'marionette.toolkit'
import tc from 'teacup'

import NavbarHeaderView from './navbar-header'
import NavbarEntriesView from './entries'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'
NavbarChannel = Backbone.Radio.channel 'navbar'
    
class BootstrapNavBarView extends Marionette.View
  tagName: 'nav'
  id: 'navbar-view'
  attributes:
    xmlns: 'http://www.w3.org/1999/xhtml'
    'xml:lang': 'en'
    role: 'navigation'
  template: tc.renderable (model) ->
    tc.div '.navbar-header'
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
    hview = new NavbarHeaderView
      model: new Backbone.Model @model.get 'brand'
    @showChildView 'header', hview
    
  onChildviewClickBrand: (view, event) ->
    eview = @getChildView 'siteEntries'
    eview.setAllInactive()
    @navigateOnClickEntry view, event
    
  navigateOnClickEntry: (cview, event) ->
    target = event.target
    # look at href and go there maybe?
    href = $(target).attr 'href'
    if href.split('/')[0] == ''
      window.location = href
    else
      router = MainChannel.request 'main-router'
      router.navigate href, trigger: true
      

export default BootstrapNavBarView


