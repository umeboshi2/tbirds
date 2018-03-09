$ = require 'jquery'
Backbone = require 'backbone'
Marionette = require 'backbone.marionette'
Toolkit = require 'marionette.toolkit'
tc = require 'teacup'

NavbarEntry = require './entry-model'

MainChannel = Backbone.Radio.channel 'global'
MessageChannel = Backbone.Radio.channel 'messages'

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
    console.log @$el.dropdown
    
    
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
          tc.a '.navbar-entry.dropdown-item', href:link.url, link.label

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
    console.log "hello there dude"
    event.stopPropagation()
    if cview.$el.hasClass "show"
      cview.$el.dropdown('toggle')
    target = event.target
    # look at href and go there maybe?
    href = $(target).attr 'href'
    if href.split('/')[0] == ''
      window.location = href
    else
      router = MainChannel.request 'main-router'
      router.navigate href, trigger: true
    #cview.closeDropDown()
    
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
    
    
module.exports = NavbarEntriesView



