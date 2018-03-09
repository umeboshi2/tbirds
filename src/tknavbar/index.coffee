$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

class NavbarEntry extends Backbone.Model
  defaults:
    label: 'App Label'
    url: '#app'
    single_applet: false
    applets: []
    urls: []
    
class NavbarEntryCollection extends Backbone.Collection
  model: NavbarEntry

navbar_entry_collection = new NavbarEntryCollection
MainChannel.reply 'navbar-entries', ->
  navbar_entry_collection

MainChannel.reply 'new-navbar-entry', ->
  new NavbarEntry

MainChannel.reply 'add-navbar-entry', (atts) ->
  navbar_entry_collection.add atts
  
MainChannel.reply 'add-navbar-entries', (olist) ->
  navbar_entry_collection.add olist

##################################################
# we may remove the channel stuff later, or use it
##################################################

  
navbar_collapse_button  = tc.renderable (target) ->
  tc.button '.navbar-toggle', type:'button', 'data-toggle':'collapse',
  'data-target': "##{target}", ->
    tc.span '.sr-only', 'Toggle Navigation'
    tc.span '.icon-bar'
    tc.span '.icon-bar'
    tc.span '.icon-bar'
      
class BaseEntryView extends Marionette.View
  model: NavbarEntry
  tagName: 'li'
  templateContext: ->
    app = MainChannel.request 'main:app:object'
    context =
      app: app
      currentUser: app.getState 'currentUser'
    return context
  ui:
    entry: '.navbar-entry'
  triggers:
    'click @ui.entry': 'click:entry'
  set_active: ->
    @$el.addClass 'active'
  unset_active: ->
    @$el.removeClass 'active'
    # FIXME triggering click:entry
    # seems to leave dropdown open
    # this closes the navbar menu
    @$el.removeClass 'open'
  
class SingleEntryView extends BaseEntryView
  template: tc.renderable (entry) ->
    tc.a '.navbar-entry', href:entry.url, entry.label

class DropdownEntryView extends BaseEntryView
  className: 'dropdown'
  template: tc.renderable (entry) ->
    tc.a '.dropdown-toggle', role:'button', 'data-toggle':'dropdown', ->
      tc.text entry.label
      tc.b '.caret'
    tc.ul '.dropdown-menu', ->
      for link in entry.menu
        if link?.needUser and not entry.currentUser
          continue
        tc.li ->
          tc.a '.navbar-entry', href:link.url, link.label

class NavbarEntryCollectionView extends Marionette.CollectionView
  tagName: 'ul'
  className: 'nav navbar-nav nav-pills'
  
  childView: (item) ->
    if item.has('menu') and item.get('menu')
      DropdownEntryView
    else
      SingleEntryView
      
  setAllInactive: ->
    @children.each (view) ->
      view.unset_active()
      
  onChildviewClickEntry: (cview, event) ->
    @setAllInactive()
    cview.set_active()
    @navigateOnClickEntry cview, event
    
  navigateOnClickEntry: (cview, event) ->
    target = event.target
    # look at href and go there maybe?
    href = $(target).attr 'href'
    if href.split('/')[0] == ''
      window.location = href
    else
      router = MainChannel.request 'main-router'
      router.navigate href, trigger: true
      

class NavbarEntriesView extends Marionette.View
  regions:
    list: '#navbar-entries'
    userMenu: '#user-menu'
    search: '#form-search-container'
  onRender: ->
    view = new NavbarEntryCollectionView
      collection: @collection
    @showChildView 'list', view
  template: tc.renderable (model) ->
    tc.div '#navbar-view-collapse.collapse.navbar-collapse', ->
      tc.div '#navbar-entries'
      tc.ul '#user-menu.nav.navbar-nav.navbar-right'
      tc.div '#form-search-container'
  setAllInactive: ->
    view = @getChildView 'list'
    view.setAllInactive()
    
    
class NavbarHeaderView extends Marionette.View
  template: tc.renderable (model) ->
    navbar_collapse_button 'navbar-view-collapse'
    tc.a '.navbar-brand', href:model.url, model.label
  ui:
    brand: '.navbar-brand'
  triggers:
    'click @ui.brand': 'click:brand'
    
    
class BootstrapNavBarView extends Marionette.View
  template: tc.renderable (model) ->
    classes = ".navbar.navbar-static-top.navbar-light.bg-primary"
    #tc.nav "#navbar-view#{classes}",
    tc.nav "#navbar-view",
    xmlns:'http://www.w3.org/1999/xhtml', 'xml:lang':'en',
    role:'navigation', ->
      tc.div '.container', ->
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


