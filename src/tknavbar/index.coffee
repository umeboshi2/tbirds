$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

NavbarHeaderView = require './navbar-header'
NavbarEntriesView = require './entries'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

    
class BootstrapNavBarView extends Marionette.View
  tagName: 'nav'
  id: 'navbar-view'
  attributes:
    xmlns: 'http://www.w3.org/1999/xhtml'
    'xml:lang': 'en'
    role: 'navigation'
    
  template: tc.renderable (model) ->
    tc.div '.navbar-header'
    tc.div '#navbar-entries'
  regions:
    header: '.navbar-header'
    usermenu: '#user-menu'
    mainmenu: '#main-menu'
    entries: '#navbar-entries'
  onRender: ->
    if @model.get 'hasUser'
      app = MainChannel.request 'main:app:object'
      currentUser = app.getState 'currentUser'
      navbarEntries = []
      for entry in @model.get 'navbarEntries'
        if entry?.needUser and not currentUser
          continue
        navbarEntries.push entry
    else
      navbarEntries = @model.get 'navbarEntries'
    eview = new NavbarEntriesView
      collection: new Backbone.Collection navbarEntries
    @showChildView 'entries', eview
    hview = new NavbarHeaderView
      model: new Backbone.Model @model.get 'brand'
    @showChildView 'header', hview
    
  onChildviewClickBrand: (view, event) ->
    eview = @getChildView 'entries'
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
      

class NavbarApp extends Toolkit.App
  onBeforeStart: ->
    appConfig = @options.appConfig
    region = @options.parentApp.getView().getRegion 'navbar'
    @setRegion region
    if appConfig.hasUser
      userMenuApp = @addChildApp 'user-menu',
        AppClass: appConfig.userMenuApp
        startWithParent: true
        appConfig: appConfig
        ,
        parentApp: @
        
  onStart: ->
    # build main page layout
    @initPage()

  initPage: ->
    appConfig = @options.parentApp.options.appConfig
    layout = new BootstrapNavBarView
      model: new Backbone.Model appConfig
    @showView layout

module.exports = NavbarApp


